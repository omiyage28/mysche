<template>
  <v-sheet elevation="0" max-width="700px" class="mx-auto">
    <CommonFlame :title="'パスワード再設定'">
      <v-form ref="form" v-model="valid" class="pa-2">
        <v-sheet elevation="0" class="mt-4">
          <p class="notes">
            パスワードを忘れた場合、再設定が可能です。
            <br />
            下のフォームに登録したメールアドレスを入力してください。
            <br />
            入力されたメールアドレスに再設定フォームへのリンクを送信します。
          </p>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              label="メールアドレス"
              class="mt-4"
              type="email"
              outlined
              dense
              color="black"
            ></v-text-field>
            <ul class="error-message" v-if="errors.length">
              <li v-for="(error, i) in errors" :key="i">
                {{ error }}
              </li>
            </ul>
            <v-row justify="center">
              <v-btn
                class="my-4 black--text"
                color="secondary"
                @click.prevent="sendMail"
                :disabled="!valid"
              >
                パスワードを再設定する
              </v-btn>
            </v-row>
            <v-row no-gutters class="my-4" justify="end">
              <router-link to="/sign_in" class="blue--text text--darken-2"
                >ログインページに戻る</router-link
              >
            </v-row>
          </v-form>
        </v-sheet>
      </v-form>
    </CommonFlame>
  </v-sheet>
</template>

<script>
import CommonFlame from "../shared/CommonFlame.vue";
import axios from "axios";

export default {
  components: {
    CommonFlame,
  },
  data() {
    return {
      valid: false,
      email: null,
      errors: [],
      email: null,
    };
  },

  methods: {
    sendMail() {
      const url = "/auth/password";
      const params = {
        email: this.email,
        redirect_url: "http://localhost:3000/password_update",
      };
      console;
      axios
        .post(url, params)
        .then((res) => {
          this.$store.dispatch("setFlash", {
            text: "入力されたメールアドレスに再設定用のメールを送信しました。",
            type: "notice",
          });
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
