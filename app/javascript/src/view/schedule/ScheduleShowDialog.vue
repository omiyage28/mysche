<template>
  <div>
    <template>
      <div class="text-center">
        <v-dialog v-model="showDialog" max-width="400">
          <v-card shaped class="card">
            <v-toolbar color="primary" dense flat>
              <v-icon :color="selectedSchedule.color">mdi-circle</v-icon>
              <v-spacer></v-spacer>
              <v-btn icon @click="showDialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-row justify="end">
              <v-btn icon class="mt-4 mr-4" @click="openConfirmationDialog">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-row>
            <v-card-title>
              <div v-if="!editTitleFlag" @click="editTitle">
                {{ selectedSchedule.title }}
              </div>
              <v-text-field
                autofocus
                v-else
                v-model="selectedSchedule.title"
                color="black"
                @blur="updateTitle"
                @keyup.enter="updateTitle"
              ></v-text-field>
            </v-card-title>
            <v-card-text>
              <div class="text-lg">
                <div
                  class="my-2 d-flex justify-space-between"
                  v-if="
                    selectedSchedule.start_date == selectedSchedule.end_date
                  "
                >
                  <div>
                    <span
                      @click="editStartDate"
                      :style="menu ? 'border-bottom:2px solid' : ' '"
                    >
                      {{ date.formatDate(selectedSchedule.start_date) }}
                    </span>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="true"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <v-date-picker
                        v-model="selectedSchedule.start_date"
                        type="date"
                        no-title
                        scrollable
                        locale="ja"
                        @input="updateStartDate"
                        @blur="updateStartDate"
                      >
                      </v-date-picker>
                    </v-menu>
                    <div v-if="displayEndDate">
                      <span
                        @click="editEndDate"
                        :style="menu2 ? 'border-bottom:2px solid' : ' '"
                      >
                        {{ date.formatDate(selectedSchedule.end_date) }}
                      </span>
                    </div>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="true"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <v-date-picker
                        v-model="selectedSchedule.end_date"
                        type="date"
                        no-title
                        scrollable
                        locale="ja"
                        @input="updateEndDate"
                      >
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <div>
                    <div>
                      <span
                        @click="editStartTime"
                        :style="
                          editStartTimeFlag ? 'border-bottom:2px solid' : ' '
                        "
                      >
                        {{ date.formatTime(selectedSchedule.start_time) }}
                      </span>
                    </div>
                    <span class="time-input" v-if="editStartTimeFlag">
                      <v-text-field
                        autofocus
                        type="time"
                        v-model="selectedSchedule.start_time"
                        color="black"
                        @blur="updateStartTime"
                      ></v-text-field>
                    </span>
                  </div>
                  <span v-if="selectedSchedule.start_time"> ~ </span>
                  <div>
                    <div>
                      <span
                        @click="editEndTime"
                        :style="
                          editEndTimeFlag ? 'border-bottom:2px solid' : ' '
                        "
                      >
                        {{ date.formatTime(selectedSchedule.end_time) }}
                      </span>
                    </div>
                    <span class="time-input" v-if="editEndTimeFlag">
                      <v-text-field
                        autofocus
                        type="time"
                        v-model="selectedSchedule.end_time"
                        color="black"
                        @blur="updateEndTime"
                      ></v-text-field>
                    </span>
                  </div>
                </div>
                <div class="mb-2" v-else>
                  <div class="d-flex">
                    <span
                      @click="editStartDate"
                      :style="menu ? 'border-bottom:2px solid' : ' '"
                      class="mr-2"
                    >
                      {{ date.formatDate(selectedSchedule.start_date) }}
                    </span>
                    <div>
                      <span
                        @click="editStartTime"
                        :style="
                          editStartTimeFlag ? 'border-bottom:2px solid' : ' '
                        "
                      >
                        {{ date.formatTime(selectedSchedule.start_time) }}
                      </span>
                      <span class="time-input" v-if="editStartTimeFlag">
                        <v-text-field
                          autofocus
                          type="time"
                          v-model="selectedSchedule.start_time"
                          color="black"
                          @blur="updateStartTime"
                        >
                        </v-text-field>
                      </span>
                    </div>

                    <span class="ml-2">~</span>
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="true"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <v-date-picker
                        v-model="selectedSchedule.start_date"
                        type="date"
                        no-title
                        scrollable
                        locale="ja"
                        @input="updateStartDate"
                        @blur="updateStartDate"
                      >
                      </v-date-picker>
                    </v-menu>
                  </div>
                  <div class="d-flex">
                    <span
                      @click="editEndDate"
                      :style="menu2 ? 'border-bottom:2px solid' : ' '"
                      class="mr-2"
                    >
                      {{ date.formatDate(selectedSchedule.end_date) }}
                    </span>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="true"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="auto"
                    >
                      <v-date-picker
                        v-model="selectedSchedule.end_date"
                        type="date"
                        no-title
                        scrollable
                        locale="ja"
                        @input="updateEndDate"
                      >
                      </v-date-picker>
                    </v-menu>
                    <div>
                      <span
                        @click="editEndTime"
                        :style="
                          editEndTimeFlag ? 'border-bottom:2px solid' : ' '
                        "
                      >
                        {{ date.formatTime(selectedSchedule.end_time) }}
                      </span>
                      <span class="time-input" v-if="editEndTimeFlag">
                        <v-text-field
                          autofocus
                          type="time"
                          v-model="selectedSchedule.end_time"
                          color="black"
                          @blur="updateEndTime"
                        >
                        </v-text-field>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  class="mb-2"
                  v-if="originalSchedule.description && !editDescriptionFlag"
                >
                  <span @click="editDescription">
                    {{ selectedSchedule.description }}
                  </span>
                </div>
                <v-textarea
                  autofocus
                  v-if="editDescriptionFlag"
                  v-model="selectedSchedule.description"
                  @blur="updateDescription"
                  color="black"
                  class="mt-5"
                  outlined
                  dense
                  placeholder="説明を入力"
                ></v-textarea>
                <div v-else>
                  <v-btn
                    text
                    class="pa-0 mt-2"
                    v-if="!selectedSchedule.description && !textareaFlag"
                    @click="textareaFlag = true"
                  >
                    <v-icon>mdi-plus</v-icon>
                    説明を追加
                  </v-btn>
                  <div v-if="!textareaFlag && !originalSchedule.description">
                    <span @click="textareaFlag = true">
                      {{ selectedSchedule.description }}
                    </span>
                  </div>
                  <v-textarea
                    autofocus
                    v-else-if="textareaFlag"
                    v-model="selectedSchedule.description"
                    @blur="updateDescription"
                    color="black"
                    class="mt-5"
                    outlined
                    dense
                    placeholder="説明を入力"
                  ></v-textarea>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </template>
    <ConfirmationDialog
      :dialog.sync="confirmationDialogFlag"
      :confirm_options="confirm_options"
      @accept="deleteSchedule"
    />
  </div>
</template>

<script>
import axios from "axios";
import setHeaders from "../../auth/setHeaders";
import date from "../../helpers/date";
import moment from "moment";
import ConfirmationDialog from "../shared/ConfirmationDialog.vue";

export default {
  components: {
    ConfirmationDialog,
  },
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
      editTitleFlag: false,
      editStartTimeFlag: false,
      editEndDateFlag: false,
      editEndTimeFlag: false,
      originalSchedule: null,
      menu: false,
      menu2: false,
      displayEndDate: false,
      textareaFlag: false,
      editDescriptionFlag: false,
      confirmationDialogFlag: false,
      confirm_options: {},
    };
  },

  methods: {
    editTitle() {
      this.editTitleFlag = true;
    },
    editStartDate() {
      this.displayEndDate = true;
      this.menu = true;
    },

    editStartTime() {
      this.editStartTimeFlag = true;
    },
    editEndDate() {
      this.menu2 = true;
    },
    editEndTime() {
      this.editEndTimeFlag = true;
    },

    updateTitle() {
      this.editTitleFlag = false;
      if (this.selectedSchedule.title == this.originalSchedule.title) {
        return;
      } else {
        const headers = setHeaders();
        axios
          .put(
            `/api/v1/schedules/${this.selectedSchedule.id}`,
            {
              schedule: {
                title: this.selectedSchedule.title,
              },
            },
            headers
          )
          .then((res) => {})
          .catch((error) => {
            console.log(error);
          });
      }
    },
    updateStartDate() {
      this.menu = false;
      if (
        this.selectedSchedule.start_date == this.originalSchedule.start_date
      ) {
        return;
      } else {
        const headers = setHeaders();
        axios
          .put(
            `/api/v1/schedules/${this.selectedSchedule.id}`,
            {
              schedule: {
                start_date: this.selectedSchedule.start_date,
              },
            },
            headers
          )
          .then((res) => {
            this.$store.dispatch("changeSchedule");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    updateStartTime() {
      const baseDate = moment(); // 現在の日付
      const startTime = baseDate.clone().set({
        hour: moment(this.selectedSchedule.start_time, "HH:mm").hour(),
        minute: moment(this.selectedSchedule.start_time, "HH:mm").minute(),
      });

      // 同じく、selectedSchedule.end_time を解析
      const endTime = baseDate.clone().set({
        hour: moment(this.selectedSchedule.end_time, "HH:mm").hour(),
        minute: moment(this.selectedSchedule.end_time, "HH:mm").minute(),
      });

      console.log(startTime);
      console.log(endTime);

      // start_time が end_time より後かつ start_time が 23:59 でない場合
      if (
        this.selectedSchedule.start_date == this.selectedSchedule.end_date &&
        startTime > endTime
      ) {
        console.log("start_time が end_time より後");
        let newEndTime = startTime.add(1, "hours");
        if (newEndTime.isBefore(startTime)) {
          // 0時を超える場合は、end_time を 23:59 に設定
          this.selectedSchedule.end_time = "23:59";
        } else {
          // それ以外の場合は、通常通り1時間後の時刻を設定
          this.selectedSchedule.end_time = newEndTime.format("HH:mm");
        }
      } else if (startTime.isSame(moment("23:59", "HH:mm"))) {
        // start_time が 23:59 の場合、end_time を翌日の 00:59 に設定
        this.selectedSchedule.end_time = "00:59";
        this.selectedSchedule.end_date = moment(
          this.selectedSchedule.start_date
        )
          .add(1, "days")
          .format("YYYY-MM-DD");
      }

      this.editStartTimeFlag = false;

      // start_time が変更されているかチェック
      if (
        this.selectedSchedule.start_time === this.originalSchedule.start_time
      ) {
        return;
      } else {
        // API通信のコード...
        const headers = setHeaders();
        axios
          .put(
            `/api/v1/schedules/${this.selectedSchedule.id}`,
            {
              schedule: {
                start_time: this.selectedSchedule.start_time,
                end_time: this.selectedSchedule.end_time,
                end_date: this.selectedSchedule.end_date,
              },
            },
            headers
          )
          .then((res) => {
            this.$store.dispatch("changeSchedule");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    updateEndTime() {
      if (
        this.selectedSchedule.start_date === this.selectedSchedule.end_date &&
        this.selectedSchedule.start_time > this.selectedSchedule.end_time
      ) {
        this.$store.dispatch("setFlash", {
          text: "終了日時は開始日時より後に設定してください",
          type: "alert",
        });
        this.editEndTimeFlag = false;
        this.selectedSchedule.start_time = this.originalSchedule.start_time;
        return;
      }
      this.editEndTimeFlag = false;
      if (this.selectedSchedule.end_time == this.originalSchedule.end_time) {
        return;
      } else {
        const headers = setHeaders();
        axios
          .put(
            `/api/v1/schedules/${this.selectedSchedule.id}`,
            {
              schedule: {
                end_time: this.selectedSchedule.end_time,
              },
            },
            headers
          )
          .then((res) => {
            this.$store.dispatch("changeSchedule");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    updateEndDate() {
      if (this.selectedSchedule.start_date > this.selectedSchedule.end_date) {
        this.$store.dispatch("setFlash", {
          text: "終了日時は開始日時より後に設定してください",
          type: "alert",
        });
        this.selectedSchedule.end_date = this.originalSchedule.end_date;
        return;
      }

      this.menu2 = false;
      if (this.selectedSchedule.end_date == this.originalSchedule.end_date) {
        return;
      } else {
        const headers = setHeaders();
        axios
          .put(
            `/api/v1/schedules/${this.selectedSchedule.id}`,
            {
              schedule: {
                end_date: this.selectedSchedule.end_date,
              },
            },
            headers
          )
          .then((res) => {
            this.originalSchedule = { ...this.selectedSchedule };
            this.$store.dispatch("changeSchedule");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    updateDescription() {
      this.textareaFlag = false;
      this.editDescriptionFlag = false;
      if (
        this.selectedSchedule.description == this.originalSchedule.description
      ) {
        return;
      } else {
        const headers = setHeaders();
        axios
          .put(
            `/api/v1/schedules/${this.selectedSchedule.id}`,
            {
              schedule: {
                description: this.selectedSchedule.description,
              },
            },
            headers
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    checkDatesAndSetDisplayEndDate() {
      if (
        this.selectedSchedule.start_date === this.selectedSchedule.end_date &&
        this.menu2 == false
      ) {
        this.displayEndDate = false;
      } else {
        this.displayEndDate = true;
      }
    },
    checkDatesAndSetDisplay() {
      if (
        this.selectedSchedule.start_date === this.selectedSchedule.end_date &&
        this.menu == false
      ) {
        this.displayEndDate = false;
      } else {
        this.displayEndDate = true;
      }
    },
    editDescription() {
      this.editDescriptionFlag = true;
    },
    openConfirmationDialog() {
      this.confirmationDialogFlag = true;
      this.confirm_options = {
        title: "スケジュールを削除しますか？",
        description: "削除したスケジュールは元に戻せません。",
        accept_text: "削除",
        cancel_text: "キャンセル",
        btnIcon: "mdi-delete",
      };
    },
    deleteSchedule() {
      const headers = setHeaders();
      axios
        .delete(`/api/v1/schedules/${this.selectedSchedule.id}`, headers)
        .then((res) => {
          this.$store.dispatch("setFlash", {
            text: "スケジュールを削除しました",
            type: "notice",
          });
          this.$store.dispatch("changeSchedule");
          this.showDialog = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
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

  watch: {
    selectedSchedule: {
      immediate: true,
      handler(newVal) {
        console.log(newVal);
        this.originalSchedule = { ...newVal };
      },
    },
    menu(newVal) {
      if (!newVal) {
        this.updateStartDate();
        this.checkDatesAndSetDisplayEndDate();
      }
    },
    menu2(newVal) {
      if (!newVal) {
        this.updateEndDate();
        this.checkDatesAndSetDisplay();
      }
    },
  },
};
</script>

<style scoped lang="scss">
.time-input {
  width: 80px;
}

.card {
  overflow-x: hidden;
}
</style>
