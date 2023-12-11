<template>
  <div class="content">
    <h2>カレンダー {{ displayDate }}</h2>
    <v-btn small @click="prevMonth" class="mr-1 my-2">
      <v-icon> mdi-chevron-left </v-icon>
      前の月</v-btn
    >
    <v-btn small @click="nextMonth" class="ml-1 my-2"
      >次の月

      <v-icon> mdi-chevron-right </v-icon>
    </v-btn>
    <div class="calendar">
      <div class="calendar-weekly">
        <div class="calendar-youbi" v-for="n in 7" :key="n">
          {{ youbi(n - 1) }}
        </div>
      </div>
      <div
        class="calendar-weekly"
        v-for="(week, index) in calendars"
        :key="index"
      >
        <div
          class="calendar-daily"
          :class="{ outside: currentMonth != day.month }"
          v-for="(day, index) in week"
          :key="index"
          @drop="dragEnd($event, day.date)"
          @dragover.prevent
        >
          <div class="calendar-day">
            {{ day.day }}
          </div>
          <div v-for="dayEvent in day.dayEvents" :key="dayEvent.id">
            <div
              v-if="dayEvent.width"
              class="calendar-event"
              :style="`width:${dayEvent.width}%;background-color:${dayEvent.color};font-weight:bold`"
              draggable="true"
              @dragstart="dragStart($event, dayEvent.id)"
              @click="openShowDialog(dayEvent)"
            >
              {{ dayEvent.title }}
            </div>
            <div v-else style="height: 26px"></div>
          </div>
        </div>
      </div>
    </div>
    <ScheduleShowDialog
      :dialog.sync="showDialog"
      :selectedSchedule="selectedSchedule"
    />
  </div>
</template>

<script>
import setHeaders from "../../auth/setHeaders";
import moment from "moment";
import axios from "axios";
import ScheduleShowDialog from "../schedule/ScheduleShowDialog.vue";

export default {
  components: {
    ScheduleShowDialog,
  },
  data() {
    return {
      currentDate: moment(),
      events: [],
      showDialog: false,
      selectedSchedule: {},
    };
  },
  methods: {
    fetchEvents() {
      const url = "/api/v1/schedules";
      const headers = setHeaders();
      axios
        .get(url, headers)
        .then((res) => {
          console.log(res.data.schedules);
          this.events = res.data.schedules;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStartDate() {
      let date = moment(this.currentDate);
      date.startOf("month");
      const youbiNum = date.day();
      return date.subtract(youbiNum, "days");
    },
    getEndDate() {
      let date = moment(this.currentDate);
      date.endOf("month");
      const youbiNum = date.day();
      return date.add(6 - youbiNum, "days");
    },
    getCalendar() {
      let startDate = this.getStartDate();
      const endDate = this.getEndDate();
      const weekNumber = Math.ceil(endDate.diff(startDate, "days") / 7);

      let calendars = [];
      let calendarDate = this.getStartDate();

      for (let week = 0; week < weekNumber; week++) {
        let weekRow = [];
        for (let day = 0; day < 7; day++) {
          let dayEvents = this.getDayEvents(calendarDate, day);
          weekRow.push({
            day: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
            date: calendarDate.format("YYYY-MM-DD"),
            dayEvents,
          });
          calendarDate.add(1, "days");
        }
        calendars.push(weekRow);
      }
      return calendars;
    },
    nextMonth() {
      this.currentDate = moment(this.currentDate).add(1, "month");
    },
    prevMonth() {
      this.currentDate = moment(this.currentDate).subtract(1, "month");
    },
    youbi(dayIndex) {
      const week = ["日", "月", "火", "水", "木", "金", "土"];
      return week[dayIndex];
    },
    getDayEvents(date, day) {
      let stackIndex = 0;
      let dayEvents = [];
      let startedEvents = [];
      this.sortedEvents.forEach((event) => {
        let startDate = moment(event.start_date).format("YYYY-MM-DD");
        let endDate = moment(event.end_date).format("YYYY-MM-DD");
        let Date = date.format("YYYY-MM-DD");
        if (startDate <= Date && endDate >= Date) {
          if (startDate === Date) {
            [stackIndex, dayEvents] = this.getStackEvents(
              event,
              day,
              date,
              stackIndex,
              dayEvents,
              startedEvents,
              event.start_date
            );
          } else if (day === 0) {
            [stackIndex, dayEvents] = this.getStackEvents(
              event,
              day,
              date,
              stackIndex,
              dayEvents,
              startedEvents,
              Date
            );
          } else {
            startedEvents.push(event);
          }
        }
      });
      return dayEvents;
    },
    getEventWidth(end, start, day) {
      console.log(day);
      let betweenDays = moment(start).diff(moment(end), "days");
      if (betweenDays > 6 - day) {
        return (6 - day) * 100 + 95;
      } else {
        return betweenDays * 100 + 95;
      }
    },
    getStackEvents(
      event,
      day,
      date,
      stackIndex,
      dayEvents,
      startedEvents,
      start
    ) {
      [stackIndex, dayEvents] = this.getStartedEvents(
        stackIndex,
        startedEvents,
        dayEvents
      );
      let width = this.getEventWidth(start, event.end_date, day);
      Object.assign(event, {
        stackIndex,
      });
      console.log(dayEvents);
      dayEvents.push({ ...event, width });
      stackIndex++;
      return [stackIndex, dayEvents];
    },
    getStartedEvents(stackIndex, startedEvents, dayEvents) {
      let startedEvent;
      do {
        startedEvent = startedEvents.find(
          (event) => event.stackIndex === stackIndex
        );
        if (startedEvent) {
          dayEvents.push(startedEvent);
          stackIndex++;
        }
      } while (typeof startedEvent !== "undefined");
      return [stackIndex, dayEvents];
    },
    dragStart(event, eventId) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";
      event.dataTransfer.setData("eventId", eventId);
    },
    dragEnd(event, date) {
      let eventId = event.dataTransfer.getData("eventId");
      let dragEvent = this.events.find((event) => event.id == eventId);
      let betweenDays = moment(dragEvent.end_date).diff(
        moment(dragEvent.start_date),
        "days"
      );
      dragEvent.start_date = date;
      dragEvent.end_date = moment(dragEvent.start_date)
        .add(betweenDays, "days")
        .format("YYYY-MM-DD");
    },
    openShowDialog(schedule) {
      this.showDialog = true;
      this.selectedSchedule = schedule;
    },
  },
  mounted() {
    this.fetchEvents();
  },
  computed: {
    calendars() {
      return this.getCalendar();
    },
    displayDate() {
      return this.currentDate.format("YYYY[年]M[月]");
    },
    currentMonth() {
      return this.currentDate.format("YYYY-MM");
    },
    sortedEvents() {
      return this.events.slice().sort(function (a, b) {
        let startDate = moment(a.start_date).format("YYYY-MM-DD");
        let startDate_2 = moment(b.start_date).format("YYYY-MM-DD");
        if (startDate < startDate_2) return -1;
        if (startDate > startDate_2) return 1;
        return 0;
      });
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  margin: 2em auto;
  width: 900px;
}
.calendar {
  max-width: 900px;
  border-top: 1px solid #e0e0e0;
  font-size: 0.8em;
}
.calendar-weekly {
  display: flex;
  border-left: 1px solid #e0e0e0;
  /* background-color: black; */
}
.calendar-daily {
  flex: 1;
  min-height: 125px;
  border-right: 1px solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  margin-right: -1px;
}
.calendar-day {
  text-align: center;
}

.calendar-youbi {
  flex: 1;
  border-right: 1px solid #e0e0e0;
  margin-right: -1px;
  text-align: center;
}

.outside {
  background-color: #f7f7f7;
}

.calendar-event {
  color: white;
  margin-bottom: 1px;
  height: 25px;
  line-height: 25px;
  position: relative;
  z-index: 1;
  border-radius: 4px;
  padding-left: 4px;
}
</style>
