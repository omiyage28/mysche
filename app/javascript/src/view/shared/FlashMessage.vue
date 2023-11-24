<template>
  <v-snackbar
    v-model="flash.show"
    :color="flashStyle"
    top
    :timeout="-1"
    outlined
  >
    {{ flash.text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        :color="flashStyle"
        text
        v-bind="attrs"
        @click="$store.dispatch('hideFlash')"
      >
        閉じる
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  computed: {
    flashStyle() {
      var color = null;
      if (this.flash.type == "alert") {
        color = "red";
      } else if (this.flash.type == "notice") {
        color = "green";
      }
      return color;
    },
    flash: {
      get() {
        return this.$store.getters.flash;
      },
      set(value) {
        this.$store.dispatch("setFlash", value);
      },
    },
  },
};
</script>
