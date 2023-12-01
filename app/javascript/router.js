import Vue from "vue";
import Router from "vue-router";
import Top from "./src/view/tops/Top.vue";
import Calendar from "./src/view/calendar/Calendar.vue";
import SignInPage from "./src/view/user/SignInPage.vue";
import SignUpPage from "./src/view/user/SignUpPage.vue";
import PasswordResetPage from "./src/view/user/PasswordResetPage.vue";
import useValidate from "./src/auth/validate";

Vue.use(Router);

const { validate } = useValidate();

const requireAuth = (to, from, next) => {
  validate()
    .then(() => {
      next();
    })
    .catch((errorMessage) => {
      console.log(errorMessage);
      next({ name: "sign_in" });
    });
};

const noRequireAuth = (to, from, next) => {
  const uid = localStorage.getItem("uid");
  const client = localStorage.getItem("client");
  const accessToken = localStorage.getItem("access-token");

  if (!uid && !client && !accessToken) {
    next();
    return;
  }

  validate()
    .then(() => {
      next({ name: "/" });
    })
    .catch(() => {
      next();
    });
};

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/sign_in",
      name: "sign_in",
      component: SignInPage,
      beforeEnter: noRequireAuth,
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
    {
      path: "/schedules",
      name: "schedules",
      component: Calendar,
      beforeEnter: requireAuth,
    },
    {
      path: "/",
      name: "top",
      component: Top,
      beforeEnter: requireAuth,
    },
  ],
});
