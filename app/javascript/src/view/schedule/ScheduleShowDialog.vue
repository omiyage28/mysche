<template>
  <div>
    <template>
      <div class="text-center">
        <v-dialog v-model="showDialog" max-width="400">
          <v-card shaped>
            <v-toolbar color="primary" dense flat>
              <v-spacer></v-spacer>
              <v-btn icon @click="showDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-title>
              <div class="mb-2">{{ selectedSchedule.title }}</div>
            </v-card-title>
            <v-card-text>
              <div class="text-lg">
                <div
                  class="my-2"
                  v-if="
                    selectedSchedule.start_date == selectedSchedule.end_date
                  "
                >
                  {{ date.formatDate(selectedSchedule.start_date) }}
                  {{ date.formatTime(selectedSchedule.start_time) }}
                  <span v-if="selectedSchedule.start_time"> ~ </span>
                  {{ date.formatTime(selectedSchedule.end_time) }}
                </div>
                <div class="mb-2" v-else>
                  <div>
                    {{ date.formatDate(selectedSchedule.start_date) }}
                    {{ selectedSchedule.start_time }}
                    <span>~</span>
                  </div>
                  <div>
                    {{ date.formatDate(selectedSchedule.end_date) }}
                    {{ selectedSchedule.end_time }}
                  </div>
                </div>
                <div class="mb-2">{{ selectedSchedule.description }}</div>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import setHeaders from "../../auth/setHeaders";
import moment from "moment";
import date from "../../helpers/date";

export default {
  props: {
    dialog: {
      type: Boolean,
      required: false,
    },
    selectedSchedule: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      date,
    };
  },

  methods: {},
  computed: {
    showDialog: {
      get() {
        return this.dialog;
      },
      set(newVal) {
        return this.$emit("update:dialog", newVal);
      },
    },
  },
};
</script>

<style scoped lang="scss"></style>
