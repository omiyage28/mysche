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
        >
          <div class="calendar-day">
            {{ day.day }}
          </div>
          <div v-for="dayEvent in day.dayEvents" :key="dayEvent.id">
            <div
              class="calendar-event"
              :style="`background-color:${dayEvent.color}`"
            >
              {{ dayEvent.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      currentDate: moment(),
      events: [
        {
          id: 1,
          name: "ミーティング",
          start: "2023-12-01",
          end: "2023-12-01",
          color: "blue",
        },
        {
          id: 2,
          name: "イベント",
          start: "2023-12-02",
          end: "2023-12-03",
          color: "limegreen",
        },
        {
          id: 3,
          name: "会議",
          start: "2023-12-06",
          end: "2023-12-06",
          color: "deepskyblue",
        },
        {
          id: 4,
          name: "有給",
          start: "2023-12-08",
          end: "2023-12-08",
          color: "dimgray",
        },
        {
          id: 5,
          name: "海外旅行",
          start: "2023-12-08",
          end: "2023-12-12",
          color: "navy",
        },
        {
          id: 6,
          name: "誕生日",
          start: "2023-12-16",
          end: "2023-12-16",
          color: "orange",
        },
        {
          id: 7,
          name: "イベント",
          start: "2023-12-12",
          end: "2023-12-15",
          color: "limegreen",
        },
        {
          id: 8,
          name: "出張",
          start: "2023-12-12",
          end: "2023-12-13",
          color: "teal",
        },
        {
          id: 9,
          name: "客先訪問",
          start: "2023-12-14",
          end: "2023-12-14",
          color: "red",
        },
        {
          id: 10,
          name: "パーティ",
          start: "2023-12-15",
          end: "2023-12-15",
          color: "royalblue",
        },
        {
          id: 12,
          name: "ミーティング",
          start: "2023-12-18",
          end: "2023-12-19",
          color: "blue",
        },
        {
          id: 13,
          name: "イベント",
          start: "2023-12-21",
          end: "2023-12-21",
          color: "limegreen",
        },
        {
          id: 14,
          name: "有給",
          start: "2023-12-20",
          end: "2023-12-20",
          color: "dimgray",
        },
        {
          id: 15,
          name: "イベント",
          start: "2023-12-25",
          end: "2023-12-28",
          color: "limegreen",
        },
        {
          id: 16,
          name: "会議",
          start: "2023-12-21",
          end: "2023-12-21",
          color: "deepskyblue",
        },
        {
          id: 17,
          name: "旅行",
          start: "2023-12-23",
          end: "2023-12-24",
          color: "navy",
        },
        {
          id: 18,
          name: "ミーティング",
          start: "2023-11-28",
          end: "2023-11-28",
          color: "blue",
        },
        {
          id: 19,
          name: "会議",
          start: "2023-11-12",
          end: "2023-11-12",
          color: "deepskyblue",
        },
        {
          id: 20,
          name: "誕生日",
          start: "2023-11-30",
          end: "2023-11-30",
          color: "orange",
        },
      ],
    };
  },
  methods: {
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
          let dayEvents = this.getDayEvents(calendarDate);
          weekRow.push({
            day: calendarDate.get("date"),
            month: calendarDate.format("YYYY-MM"),
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
    getDayEvents(date) {
      return this.events.filter((event) => {
        let startDate = moment(event.start).format("YYYY-MM-DD");
        let endDate = moment(event.end).format("YYYY-MM-DD");
        let Date = date.format("YYYY-MM-DD");
        if (startDate <= Date && endDate >= Date) return true;
      });
    },
  },
  mounted() {
    console.log(this.getCalendar());
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
}
</style>
