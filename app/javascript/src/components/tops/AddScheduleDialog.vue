<template>
  <div>
    <template>
      <div class="text-center">
        <v-dialog v-model="dialog" max-width="800">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="secondary black--text" v-bind="attrs" v-on="on">
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
                    ref="menu"
                    v-model="menu"
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
                        @click="menu = true"
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
                      @input="menu = false"
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
                    ref="menu"
                    v-model="menu"
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
                        @click="menu = true"
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
                      @input="menu = false"
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
            </v-form>
            <v-card-actions>
              <v-row no-gutters justify="center">
                <v-btn
                  class="mt-4 black--text"
                  color="secondary"
                  @click="createRequirement()"
                  >作成する</v-btn
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
      },
      menu: false,
    };
  },
};
</script>
