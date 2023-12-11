<template>
  <div>
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog" max-width="800">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary black--text" v-bind="attrs" v-on="on">
              <v-icon> mdi-plus </v-icon>
              予定を追加
            </v-btn>
          </template>

          <v-card>
            <v-toolbar color="primary" dense flat>
              <v-toolbar-title class="font-medium">予定の作成</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
            <v-form ref="form" v-model="valid">
              <v-row no-gutters>
                <v-col cols="12">
                  <v-text-field
                    label="タイトル"
                    class="px-4 mt-4"
                    outlined
                    dense
                    color="black"
                    required
                    v-model="schedule.title"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    label="説明"
                    class="px-4"
                    outlined
                    dense
                    color="black"
                    v-model="schedule.description"
                  ></v-textarea>
                </v-col>

                <v-col cols="6">
                  <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        dense
                        v-model="schedule.start_date"
                        label="開始日"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click="menu1 = true"
                        class="px-4"
                        color="black"
                      />
                    </template>
                    <v-date-picker
                      v-model="schedule.start_date"
                      type="date"
                      no-title
                      scrollable
                      locale="ja"
                      @input="menu1 = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-if="!schedule.is_all_day"
                    outlined
                    dense
                    type="time"
                    v-model="schedule.start_time"
                    label="開始時間"
                    class="px-4"
                    color="black"
                  />
                </v-col>
                <v-col cols="2">
                  <v-row align="center" justify="center">
                    <v-checkbox
                      label="終日"
                      color="black"
                      v-model="schedule.is_all_day"
                    ></v-checkbox>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="true"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        outlined
                        dense
                        v-model="schedule.end_date"
                        label="終了日"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click="menu2 = true"
                        class="px-4"
                        color="black"
                      />
                    </template>
                    <v-date-picker
                      v-model="schedule.end_date"
                      type="date"
                      no-title
                      scrollable
                      locale="ja"
                      @input="menu2 = false"
                    >
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-if="!schedule.is_all_day"
                    outlined
                    dense
                    type="time"
                    v-model="schedule.end_time"
                    label="終了時間"
                    class="px-4"
                    color="black"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="radio-group-center">
                  <v-radio-group v-model="schedule.color" row>
                    <v-radio
                      label="あお"
                      :value="0"
                      color="blue"
                      class="radio-group-center"
                    >
                      <template v-slot:label>
                        <div>
                          <strong class="blue--text">あお</strong>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio label="あか" :value="1" color="red">
                      <template v-slot:label>
                        <div>
                          <strong class="red--text">あか</strong>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio label="きいろ" :value="2" color="yellow">
                      <template v-slot:label>
                        <div>
                          <strong class="yellow--text">きいろ</strong>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio label="みどり" :value="3" color="green">
                      <template v-slot:label>
                        <div>
                          <strong class="green--text">みどり</strong>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio label="ピンク" :value="4" color="pink">
                      <template v-slot:label>
                        <div>
                          <strong class="pink--text">ピンク</strong>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio label="オレンジ" :value="5" color="orange">
                      <template v-slot:label>
                        <div>
                          <strong class="orange--text">オレンジ</strong>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio label="むらさき" :value="6" color="purple">
                      <template v-slot:label>
                        <div>
                          <strong class="purple--text">むらさき</strong>
                        </div>
                      </template>
                    </v-radio>
                    <v-radio label="グレー" :value="7" color="grey">
                      <template v-slot:label>
                        <div>
                          <strong class="grey--text">グレー</strong>
                        </div>
                      </template>
                    </v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-form>
            <v-card-actions>
              <v-row no-gutters justify="center">
                <v-btn
                  class="mt-4 black--text"
                  color="secondary"
                  @click="createSchedule()"
                >
                  <v-icon class="mr-1"> mdi-content-save-outline </v-icon>
                  作成する</v-btn
                >
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </div>
</template>

<script>
import axios from "axios";
import setHeaders from "../../auth/setHeaders";
import rules from "../../helpers/rules";

export default {
  data() {
    return {
      dialog: false,
      valid: false,
      schedule: {
        title: "",
        description: "",
        start_date: "",
        start_time: "",
        end_date: "",
        end_time: "",
        is_all_day: false,
        color: 0,
      },
      menu1: false,
      menu2: false,
      rules,
    };
  },

  methods: {
    createSchedule() {
      const url = "/api/v1/schedules";
      const headers = setHeaders();

      const schedule = {
        schedule: {
          title: this.schedule.title,
          description: this.schedule.description,
          start_date: this.schedule.start_date,
          start_time: this.schedule.start_time,
          end_date: this.schedule.end_date,
          end_time: this.schedule.end_time,
          is_all_day: this.schedule.is_all_day,
          color: this.schedule.color,
        },
      };

      axios
        .post(url, schedule, headers)
        .then((res) => {
          this.dialog = false;
          this.$store.dispatch("setFlash", {
            type: "notice",
            text: "予定を作成しました。",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.radio-group-center {
  display: flex;
  justify-content: center;
}
</style>
