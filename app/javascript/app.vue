<template>
  <v-app>
    <FlaShMessage />
    <v-navigation-drawer app v-model="drawer" clipped v-if="!isSignInPage">
      <v-container>
        <div class="pa-5">
          <ScheduleNewDialog />
        </div>
        <v-divider></v-divider>
        <v-list nav>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ login_user_name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name">
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                @click="renderPage(nav_list)"
                class="cursor-pointer"
              >
                {{ nav_list.name }}</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="signOut" class="cursor-pointer"
                >ログアウト</v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-navigation-drawer>
    <v-app-bar color="primary" app clipped-left height="70" elevation="1">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <div @click="$router.push('/')" class="cursor-pointer">マイスケ</div>
      </v-toolbar-title>
    </v-app-bar>
    <div class="main-body">
      <v-sheet elevation="0" class="mx-auto px-2">
        <router-view></router-view>
      </v-sheet>
    </div>
    <!-- <v-footer color="primary" app>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center" cols="12" style="font-size: 12px">
          {{ new Date().getFullYear() }}　©マイスケ
        </v-col>
      </v-row>
    </v-footer> -->
  </v-app>
</template>

<script>
import ScheduleNewDialog from "./src/view/schedule/ScheduleNewDialog.vue";
import FlaShMessage from "./src/view/shared/FlashMessage.vue";
import axios from "axios";

export default {
  components: {
    ScheduleNewDialog,
    FlaShMessage,
  },
  data: () => ({
    drawer: false,
    nav_lists: [
      {
        name: "カレンダー",
        icon: "mdi-calendar-today",
        page: "schedules",
      },
      { name: "タスク", icon: "mdi-format-list-checks", page: "tasks" },
      { name: "メモ", icon: "mdi-note-text", page: "memos" },
      { name: "設定", icon: "mdi-cog", page: "setting" },
    ],
    login_user_name: localStorage.getItem("name"),
  }),

  computed: {
    // 現在のルートがサインインページかどうかを判断
    isSignInPage() {
      return this.$route.name === "sign_in" || this.$route.name === "sign_up";
    },
  },

  methods: {
    openDrawer() {
      this.drawer = true;
    },
    renderPage(nav_list) {
      this.$router.push({ name: nav_list.page });
    },
    signOut() {
      axios
        .delete("/auth/sign_out", {
          headers: {
            "access-token": localStorage.getItem("access-token"),
            client: localStorage.getItem("client"),
            uid: localStorage.getItem("uid"),
          },
        })
        .then((res) => {
          localStorage.removeItem("access-token");
          localStorage.removeItem("client");
          localStorage.removeItem("uid");
          localStorage.removeItem("name");
          this.$store.dispatch("setFlash", {
            text: "ログアウトしました",
            type: "notice",
          });
          this.$router.push("/sign_in");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
.main-body {
  margin-top: 70px;
}

.main-width {
  width: calc(100vw - 200px);
}
</style>
