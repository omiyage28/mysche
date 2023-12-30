<template>
  <v-sheet elevation="0" max-width="700px" class="mx-auto">
    <CommonFlame :title="'パスワード再設定'">
      <v-form ref="form" v-model="valid" class="pa-2">
        <div v-if="error" class="text-red-400 font-semibold">{{ error }}</div>
        <v-text-field
          class="mt-4"
          label="パスワード(必須)"
          type="password"
          autocomplete="new-password"
          hint="英大文字・小文字・数字を含む8文字以上で入力して下さい"
          outlined
          dense
          color="black"
          v-model="user.password"
          :rules="[rules.required, rules.passwordMin]"
        ></v-text-field>
        <v-text-field
          autocomplete="new-password"
          class="mt-4"
          label="パスワード(必須)"
          type="password"
          hint="英大文字・小文字・数字を含む8文字以上で入力して下さい"
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
          @click="updatePassword"
        >
          <v-icon class="mr-2"> mdi-save-content </v-icon>
          再設定</v-btn
        >
      </v-row>
    </CommonFlame>
  </v-sheet>
</template>

<script>
import CommonFlame from "../shared/CommonFlame.vue";
import axios from "axios";
import rules from "../../helpers/rules";

export default {
  components: {
    CommonFlame,
  },
  data() {
    return {
      user: {
        password: null,
        password_confirmation: null,
      },
      valid: false,
      error: null,
      rules,
    };
  },

  methods: {
    updatePassword() {
      this.error = null;

      if (this.password != this.password_confirmation) {
        this.error = "パスワードが一致しません。";
        return;
      }
      const headers = {
        "access-token": this.$route.query["access-token"],
        client: this.$route.query["client"],
        uid: this.$route.query["uid"],
      };
      console.log(headers);

      axios
        .put(
          "/auth/password",
          {
            password: this.user.password,
            password_confirmation: this.user.password_confirmation,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          this.$store.dispatch("setFlash", {
            text: "パスワードを再設定しました。",
            type: "notice",
          });
          this.$router.push("/sign_in");
        })
        .catch((error) => {
          if (error) {
            this.error = "問題があります。";
          }
        });
    },
  },
};
</script>

<style></style>
