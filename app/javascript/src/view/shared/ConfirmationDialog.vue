<template>
  <v-dialog v-model="showDialog" persistent max-width="500">
    <v-card>
      <v-toolbar color="primary" dense flat>
        <v-toolbar-title> {{ confirm_options.title }}</v-toolbar-title>
        <v-spacer />
        <v-btn icon @click="closeDialog()">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <div class="pa-2">
        <slot name="text">
          <p class="pre-wrap" v-text="confirm_options.description"></p>
        </slot>
      </div>
      <v-card-actions>
        <v-row no-gutters class="mt-4">
          <v-col sm="3" cols="0" />
          <v-col sm="6" cols="12" class="text-center">
            <slot name="button">
              <v-btn color="secondary black--text" @click="accept">
                <slot name="accept-text">
                  <v-icon class="mr-1">{{ confirm_options.btnIcon }}</v-icon>
                  <span class="mt-1">{{ confirm_options.accept_text }}</span>
                </slot>
              </v-btn>
            </slot>
          </v-col>
          <v-col sm="3" cols="0" class="text-right">
            <v-btn
              v-if="!$vuetify.breakpoint.xs"
              color="grey darken-1"
              text
              @click="closeDialog()"
              >{{ confirm_options.cancel_text }}
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: false,
    },
    confirm_options: {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      accept_text: {
        type: String,
        default: "確認",
      },
      cancel_text: {
        type: String,
        default: "キャンセル",
      },
      btnIcon: {
        type: String,
        default: "mdi-check",
      },
    },
  },
  data() {
    return {
      title: "",
      message: "",
      dialogByBtn: false,
    };
  },
  methods: {
    accept() {
      this.$emit("accept");
      this.closeDialog();
    },

    openDialog(title, message) {
      this.showDialog = true;
      this.title = title;
      this.message = message;
    },
    closeDialog() {
      this.$emit("cancel");
      this.showDialog = false;
      this.title = "";
      this.message = "";
    },
  },
  computed: {
    showDialog: {
      get() {
        return this.dialog;
      },
      set(val) {
        return this.$emit("update:dialog", val);
      },
    },
  },
  watch: {},
};
</script>
