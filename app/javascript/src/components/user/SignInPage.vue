<template>
  <v-sheet elevation="0" max-width="700px" class="mx-auto">
    <CommonFlame :title="'サインイン'">
      <v-form ref="form" v-model="valid" class="pa-2">
        <v-text-field
          class="mt-4"
          label="メールアドレス(必須)"
          outlined
          dense
          required
          color="black"
        ></v-text-field>
        <v-text-field
          class="mt-4"
          label="パスワード(必須)"
          type="password"
          :hint="
            login ? '' : '英大文字・小文字・数字を含む8文字以上で入力して下さい'
          "
          counter
          outlined
          dense
          color="black"
        ></v-text-field>
      </v-form>
      <v-row no-gutters justify="center">
        <v-btn :disabled="!valid" color="secondary" class="black--text">
          <v-icon class="mr-2"> mdi-login </v-icon>
          サインイン</v-btn
        >
      </v-row>
      <v-row no-gutters class="my-4" justify="end">
        <router-link to="/password_reset" class="blue--text text--darken-2"
          >パスワードを忘れた方はこちら</router-link
        >
      </v-row>
    </CommonFlame>
  </v-sheet>
</template>

<script>
import CommonFlame from "../shared/CommonFlame.vue";

export default {
  components: {
    CommonFlame,
  },
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      valid: false,
    };
  },
};
</script>

<style></style>
