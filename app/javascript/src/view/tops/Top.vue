<template>
  <div>
    <div v-for="schedule in schedules" :key="schedule.id">
      {{ schedule.title }}
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      schedules: [],
    };
  },

  mounted() {
    this.fetchSchedules();
  },

  methods: {
    fetchSchedules() {
      axios
        .get("/api/v1/schedules")
        .then((res) => {
          this.schedules = res.data.schedules;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
