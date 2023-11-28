<template>
  <v-sheet elevation="0" max-width="700px" class="mx-auto">
    <CommonFlame :title="'サインイン'">
      <v-form ref="form" v-model="valid" class="pa-2">
        <div v-if="error" class="text-red-400 font-semibold">{{ error }}</div>
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
      </v-form>
      <v-row no-gutters justify="center">
        <v-btn
          :disabled="!valid"
          color="secondary"
          class="black--text"
          @click="signIn"
        >
          <v-icon class="mr-2"> mdi-login </v-icon>
          サインイン</v-btn
        >
      </v-row>
      <v-row no-gutters class="my-4" justify="end">
        <router-link to="/password_reset" class="blue--text text--darken-2"
          >パスワードを忘れた方はこちら</router-link
        >
      </v-row>
      <v-row no-gutters class="my-4" justify="end">
        <router-link to="/sign_up" class="blue--text text--darken-2"
          >サインアップ</router-link
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
        email: null,
        password: null,
      },
      valid: false,
      error: null,
      rules,
    };
  },
  methods: {
    signIn() {
      axios
        .post("/auth/sign_in", {
          email: this.user.email,
          password: this.user.password,
        })
        .then((res) => {
          setItem(res.headers, res.data.data.name);
          this.$store.dispatch("setFlash", {
            text: "サインインしました",
            type: "notice",
          });
          this.$router.push("/top");
        })
        .catch((error) => {
          this.error = "メールアドレスかパスワードが間違っています。";
        });
    },
  },
};
</script>

<style></style>
