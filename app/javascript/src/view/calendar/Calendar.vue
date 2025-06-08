<template>
  <div class="content" ref="calendar">
    <div class="flex justify-between">
      <div class="flex items-center">
        <h2 class="font-weight-bold text-xl">{{ displayDate }}</h2>
      </div>
      <div>
        <v-btn small @click="prevMonth" class="mr-1 my-2">
          <v-icon> mdi-chevron-left </v-icon>
          前の月</v-btn
        >
        <v-btn small @click="nextMonth" class="ml-1 my-2"
          >次の月
          <v-icon> mdi-chevron-right </v-icon>
        </v-btn>
      </div>
    </div>
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
          @dblclick="openCreateDialog(day.date)"
          @drop="dragEnd($event, day.date)"
          @dragover.prevent
          @mousedown="startCellDrag($event, day.date, index)"
          @mouseenter="cellDrag($event, day.date, index)"
        >
          <div class="calendar-day">
            {{ day.day }}
          </div>
          <div v-for="dayEvent in day.dayEvents" :key="dayEvent.id">
            <div
              v-if="dayEvent.width"
              class="calendar-event"
              :style="`width:${dayEvent.width}%;background-color:${dayEvent.color};font-weight:bold`"
              :draggable="!rightResizing && !leftResizing ? true : false"
              @dragstart="dragStart($event, dayEvent.id)"
              @click="openShowDialog(dayEvent)"
            >
              <div
                class="change-start-date"
                style="top: 6px; left: -6px; cursor: col-resize"
                @mousedown="mouseDownResize(dayEvent, 'left')"
              ></div>
              <div
                class="change-end-date"
                style="top: 6px; right: -6px; cursor: col-resize"
                @mousedown="mouseDownResize(dayEvent, 'right')"
              ></div>
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
    <ScheduleCreateDialog
      :createBtnFlag="false"
      :dialog.sync="openCreateDialogFlag"
      :date="createDate"
    />
  </div>
</template>

<script>
import setHeaders from "../../auth/setHeaders";
import moment from "moment";
import axios from "axios";
import ScheduleCreateDialog from "../schedule/ScheduleCreateDialog.vue";
import ScheduleShowDialog from "../schedule/ScheduleShowDialog.vue";

export default {
  components: {
    ScheduleShowDialog,
    ScheduleCreateDialog,
  },
  data() {
    return {
      currentDate: moment(),
      events: [],
      showDialog: false,
      selectedSchedule: {},
      width: "",
      pageX: "",
      element: "",
      leftResizing: false,
      rightResizing: false,
      openCreateDialogFlag: false,
      createDate: "",
      hasResized: false,
      cellIndex: "",
      cellDate: "",
      cellRef: "",
      enteredDates: [],
      isMouseDown: false,
      displayTimeLeft: "",
      rightDateLabel: "",
      startDragPosition: "",
    };
  },
  methods: {
    fetchEvents() {
      const url = "/api/v1/schedules";
      const headers = setHeaders();
      axios
        .get(url, headers)
        .then((res) => {
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
      const key = date.format("YYYY-MM-DD");
      const events = this.eventsByDate[key] || [];
      events.forEach((event) => {
        let startDate = moment(event.start_date).format("YYYY-MM-DD");
        if (startDate === key) {
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
            key
          );
        } else {
          startedEvents.push(event);
        }
      });
      return dayEvents;
    },
    getEventWidth(end, start, day) {
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

      const url = `/api/v1/schedules/${eventId}`;
      const headers = setHeaders();
      const params = {
        start_date: dragEvent.start_date,
        end_date: dragEvent.end_date,
      };

      axios
        .put(url, params, headers)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    },
    openShowDialog(schedule) {
      if (this.hasResized) {
        return;
      }
      this.showDialog = true;
      this.selectedSchedule = schedule;
    },

    openCreateDialog(date) {
      this.openCreateDialogFlag = true;
      this.createDate = date;
    },
    mouseDownResize(schedule, direction) {
      if (direction === "left") {
        this.leftResizing = true;
      } else {
        this.rightResizing = true;
      }
      let parentElement = event.target.closest(".calendar-event");
      if (parentElement) {
        this.element = parentElement;
        let childElement = parentElement.children[0];
        this.left = childElement.style.left;
        this.width = parentElement.style.width;
      }
      this.pageX = event.pageX;
      this.schedule_id = schedule.id;
    },
    mouseResize(event) {
      if (this.leftResizing || this.rightResizing) {
        let diff = event.pageX - this.pageX;
        let parentWidth = this.element.parentElement.offsetWidth;

        if (this.leftResizing) {
          // 左側のリサイズの場合
          let diffPercent = (diff * 100) / parentWidth;
          let newWidth = parseInt(this.width.replace("%", "")) - diffPercent;
          let newLeft = parseInt(this.left.replace("%", "")) + diffPercent;

          // 新しい幅が最小値(94%)を下回らないように調整
          console.log(newWidth);
          if (newWidth < 85) {
            newLeft -= 85 - newWidth;
            newWidth = 85;
          }

          this.element.style.left = `${newLeft}%`;
          this.element.style.width = `${newWidth + 6}%`;
        } else if (this.rightResizing) {
          // 右側のリサイズの場合
          let newWidth =
            parseInt(this.width.replace("%", "")) + (diff * 100) / parentWidth;
          newWidth = Math.max(newWidth, 94);
          this.element.style.width = `${newWidth}%`;
        }
      }
    },

    stopDrag(event) {
      event.stopPropagation();
      if (!this.leftResizing && !this.rightResizing) {
        return;
      }
      let diff = event.pageX - this.pageX;
      let schedule = this.events.find((event) => event.id == this.schedule_id);
      if (!schedule) {
        return;
      }

      let newWidthPercent = parseFloat(
        this.element.style.width.replace("%", "") -
          this.width.replace("%", "") +
          100
      );

      if (this.rightResizing) {
        let daysDiff = Math.floor(newWidthPercent / 100);
        if (daysDiff > 0) {
          let newEndDate = moment(schedule.end_date).add(daysDiff, "days");
          schedule.end_date = newEndDate.format("YYYY-MM-DD");
        } else if (daysDiff < 0) {
          let newDaysDiff = Math.abs(daysDiff);
          let newEndDate = moment(schedule.end_date).subtract(
            newDaysDiff,
            "days"
          );
          schedule.end_date = newEndDate.format("YYYY-MM-DD");
        } else {
          this.element.style.width = this.width;
        }
      } else if (this.leftResizing) {
        // 左側をリサイズした場合のみ start_date を更新する
        let daysDiff = Math.floor(newWidthPercent / 100);
        if (daysDiff > 0) {
          let newStartDate = moment(schedule.start_date).subtract(
            daysDiff,
            "days"
          );
          schedule.start_date = newStartDate.format("YYYY-MM-DD");
        } else if (daysDiff < 0) {
          let newDaysDiff = Math.abs(daysDiff);
          let newStartDate = moment(schedule.start_date).add(
            newDaysDiff,
            "days"
          );
          schedule.start_date = newStartDate.format("YYYY-MM-DD");
        } else {
          this.element.style.left = 0;
          this.element.style.width = this.width;
        }
      }

      this.leftResizing = false;
      this.rightResizing = false;

      this.hasResized = true;
      setTimeout(() => {
        this.hasResized = false; // 一定時間後にフラグをリセット
      }, 100); // 100ms後にリセット

      const url = `/api/v1/schedules/${schedule.id}`;
      const headers = setHeaders();
      const params = {
        start_date: schedule.start_date,
        end_date: schedule.end_date,
      };

      axios
        .put(url, params, headers)
        .then((res) => {})
        .catch((error) => {
          console.log(error);
        });
    },

    startCellDrag(event, date, index) {
      this.isMouseDown = true;
      this.cellIndex = index;
      this.enteredDates = [date];
    },

    cellDrag(event, date, index) {
      if (this.isMouseDown) {
        this.enteredDates.push(date);
        console.log(this.enteredDates);
      }
    },

    stopCellDrag(event) {
      const url = "/api/v1/schedules";
      const headers = setHeaders();

      if (this.isMouseDown) {
        // ドラッグ操作が終了したときにイベントを作成
        let startDate = this.enteredDates[0];
        let endDate = this.enteredDates[this.enteredDates.length - 1];
        this.events.push({
          title: "新規イベント",
          start_date: startDate,
          end_date: endDate,
          color: "blue",
        });
        axios
          .post(
            url,
            {
              title: "新規イベント",
              start_date: startDate,
              end_date: endDate,
            },
            headers
          )
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
      }
      this.isMouseDown = false;
      this.enteredDates = [];
    },
  },
  mounted() {
    this.fetchEvents();
    window.addEventListener("mousemove", this.mouseResize);
    window.addEventListener("mouseup", this.stopDrag);
    window.addEventListener("mouseup", this.stopCellDrag);
  },
  watch: {
    scheduleChanged(newVal) {
      if (newVal) {
        this.fetchEvents();
        this.$store.dispatch("resetScheduleChanged");
      }
    },
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
    eventsByDate() {
      const map = {};
      this.events.forEach((event) => {
        let start = moment(event.start_date);
        let end = moment(event.end_date);
        for (let d = start.clone(); d.isSameOrBefore(end); d.add(1, "day")) {
          const key = d.format("YYYY-MM-DD");
          if (!map[key]) map[key] = [];
          map[key].push(event);
        }
      });
      return map;
    },
    scheduleChanged() {
      return this.$store.state.scheduleChanged;
    },
  },
};
</script>

<style scoped lang="scss">
.calendar {
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
  min-height: 100px;
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
  height: 20px;
  line-height: 20px;
  position: relative;
  z-index: 1;
  border-radius: 4px;
  padding-left: 4px;
}

.change-start-date {
  position: absolute;
  width: 12px;
  height: 14px;
  cursor: col-resize;
  z-index: 2;
}
.change-end-date {
  position: absolute;
  width: 12px;
  height: 14px;
  cursor: col-resize;
  z-index: 2;
}
</style>
