import axios from "axios";
import store from "../../packs/store";

export default function useValidate() {
  const validate = () => {
    const uid = localStorage.getItem("uid");
    const client = localStorage.getItem("client");
    const accessToken = localStorage.getItem("access-token");
    const isAuthenticated = localStorage.getItem("authenticated");

    return axios
      .get("auth/validate_token", {
        headers: {
          uid: uid,
          "access-token": accessToken,
          client: client,
        },
      })
      .then((res) => {
        if (isAuthenticated === "true") {
          store.dispatch("setFlash", {
            text: "サインインしました",
            type: "notice",
          });
        }
        localStorage.removeItem("authenticated");
        return res;
      })
      .catch((err) => {
        localStorage.removeItem("uid");
        localStorage.removeItem("access-token");
        localStorage.removeItem("client");
        localStorage.removeItem("name");
        store.dispatch("setFlash", {
          text: "サインインしてください",
          type: "alert",
        });

        return Promise.reject("認証に失敗しました");
      });
  };

  return { validate };
}
