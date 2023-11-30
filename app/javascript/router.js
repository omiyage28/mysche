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
      // 認証が成功した場合
      next({ name: "/" }); // 認証済みなのでチャットルームにリダイレクト
    })
    .catch(() => {
      // 認証が失敗した場合
      next(); // 現在のルートに留まる
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
      path: "/",
      name: "root",
      component: Top,
      beforeEnter: requireAuth,
    },
    {
      path: "/schedules",
      name: "calendar",
      component: Calendar,
      beforeEnter: requireAuth,
    },
    {
      path: "/top",
      name: "top",
      component: Top,
      beforeEnter: requireAuth,
    },
  ],
});
