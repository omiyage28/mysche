import Vue from "vue";
import Router from "vue-router";
import Top from "./src/components/tops/Top.vue";
import Calendar from "./src/components/calendar/Calendar.vue";
import SignInPage from "./src/components/user/SignInPage.vue";
import SignUpPage from "./src/components/user/SignUpPage.vue";
import PasswordResetPage from "./src/components/user/PasswordResetPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "top",
      component: Top,
    },
    {
      path: "/schedules",
      name: "calendar",
      component: Calendar,
    },
    {
      path: "/sign_in",
      name: "sign_in",
      component: SignInPage,
    },
    {
      path: "/sign_up",
      name: "sign_up",
      component: SignUpPage,
    },
    {
      path: "/password_reset",
      name: "password_reset",
      component: PasswordResetPage,
    },
  ],
});
