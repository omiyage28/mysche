<template>
  <v-sheet class="common-frame pb-2" elevation="0">
    <div class="mt-6 border-solid border border-secondary rounded">
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
