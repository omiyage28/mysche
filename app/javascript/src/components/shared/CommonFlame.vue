<template>
  <v-sheet class="common-frame pb-2" elevation="0">
    <div class="main-part" :style="{ maxWidth }">
      <v-app-bar color="primary" dense flat>
        <v-app-bar-title class="color-white text-h6 font-weight-bold">
          {{ title }}
        </v-app-bar-title>
        <v-spacer />
        <slot name="app-bar-btn" />
      </v-app-bar>
      <slot name="mobile-btn" />
      <div class="part-main pa-2">
        <slot />
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "タイトル",
    },
    maxWidth: {
      type: null,
      required: false,
      default: "1200px",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../stylesheet/variable.scss";
.main-part {
  border: solid 2px $main-color;
  border-radius: 5px;
  max-height: calc(100% - 84px);
  margin: 0 auto;
}
.part-main {
  position: relative;
}
.common-frame {
  &:first-child {
    margin-top: 16px;
  }
}
</style>
