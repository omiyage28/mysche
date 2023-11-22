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
        ></v-text-field>
        <v-row no-gutters justify="center" class="mt-4">
          <v-btn :disabled="!valid" class="btn" color="secondary">
            <v-icon class="mr-2"> mdi-login </v-icon>
            サインイン</v-btn
          >
        </v-row>
        <v-row no-gutters class="my-4" justify="end">
          <router-link to="/users/passwords/reset" class="link"
            >パスワードを忘れた方はこちら</router-link
          >
        </v-row>
      </v-form>
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

<style lang="scss" scoped>
@import "../../stylesheet/variable.scss";
.link {
  color: $main-color;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
