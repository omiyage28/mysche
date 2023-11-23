<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" clipped>
      <v-container>
        <div class="pa-5">
          <AddScheduleDialog />
        </div>
        <v-divider></v-divider>
        <v-list nav>
          <v-list-item v-for="nav_list in nav_lists" :key="nav_list.name">
            <v-list-item-icon>
              <v-icon>{{ nav_list.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="renderPage(nav_list)">
                {{ nav_list.name }}</v-list-item-title
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
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" text>Support<v-icon>mdi-menu-down</v-icon></v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Consulting and support</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Discord community</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>
    <div class="main-body">
      <router-view></router-view>
    </div>
    <v-footer color="primary" app>
      <v-row justify="center" no-gutters>
        <v-col class="py-4 text-center" cols="12" style="font-size: 12px">
          {{ new Date().getFullYear() }}　©マイスケ
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import AddScheduleDialog from "./src/components/tops/AddScheduleDialog.vue";
export default {
  components: {
    AddScheduleDialog,
  },
  data: () => ({
    drawer: false,
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    nav_lists: [
      {
        name: "カレンダー",
        icon: "mdi-calendar-check",
        page: "calendar",
      },
      { name: "MY MEMO", icon: "mdi-pencil-box" },
    ],
  }),

  methods: {
    openDrawer() {
      this.drawer = true;
    },
    renderPage(nav_list) {
      this.$router.push({ name: nav_list.page });
    },
  },
};
</script>

<style>
.main-body {
  margin-top: 70px;
}
</style>
