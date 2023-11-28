<template>
  <v-sheet elevation="0" max-width="700px" class="mx-auto">
    <CommonFlame :title="'サインアップ'">
      <v-form ref="form" v-model="valid" class="pa-2">
        <div v-if="error" class="text-red-400 font-semibold">{{ error }}</div>
        <v-text-field
          class="mt-4"
          label="名前(必須)"
          outlined
          dense
          required
          color="black"
          v-model="user.name"
          :rules="[rules.required]"
        ></v-text-field>
        <v-text-field
          class="mt-4"
          label="メールアドレス(必須)"
          outlined
          dense
          required
          color="black"
          v-model="user.email"
          :rules="[rules.required, rules.emailFormat]"
        ></v-text-field>
        <v-text-field
          class="mt-4"
          label="パスワード(必須)"
          type="password"
          hint="英大文字・小文字・数字を含む8文字以上で入力して下さい"
          counter
          outlined
          dense
          color="black"
          v-model="user.password"
          :rules="[rules.required, rules.passwordMin]"
        ></v-text-field>
        <v-text-field
          class="mt-4"
          label="パスワード(必須)"
          type="password"
          hint="英大文字・小文字・数字を含む8文字以上で入力して下さい"
          counter
          outlined
          dense
          color="black"
          v-model="user.password_confirmation"
          :rules="[rules.required, rules.passwordMin]"
        ></v-text-field>
      </v-form>
      <v-row no-gutters justify="center">
        <v-btn
          :disabled="!valid"
          color="secondary"
          class="black--text"
          @click="signUp"
        >
          <v-icon class="mr-2"> mdi-account-plus </v-icon>
          サインアップ</v-btn
        >
      </v-row>
      <v-row no-gutters class="my-4" justify="end">
        <router-link to="/sign_in" class="blue--text text--darken-2"
          >サインインページに戻る</router-link
        >
      </v-row>
    </CommonFlame>
  </v-sheet>
</template>

<script>
import CommonFlame from "../shared/CommonFlame.vue";
import axios from "axios";
import setItem from "../../auth/setItem";
import rules from "../../helpers/rules";

export default {
  components: {
    CommonFlame,
  },
  data() {
    return {
      user: {
        name: null,
        email: null,
        password: null,
      },
      valid: false,
      error: null,
      rules,
    };
  },
  methods: {
    signUp() {
      this.error = null;

      if (this.password != this.password_confirmation) {
        this.error = "パスワードが一致しません。";
        return;
      }

      axios
        .post("/auth", {
          name: this.user.name,
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
        })
        .then((res) => {
          setItem(res.headers, res.data.data.name);
          this.$store.dispatch("setFlash", {
            text: "アカウントを登録しました。",
            type: "notice",
          });
          this.$router.push("/");
        })
        .catch((error) => {
          if (error) {
            this.error = "パスワードが一致しません。";
          } else {
            this.error = "アカウントを登録できませんでした。";
          }
        });
    },
  },
};
</script>

<style></style>
