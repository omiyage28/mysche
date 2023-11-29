import axios from "axios";

const validate = () => {
  const uid = window.localStorage.getItem("uid");
  const client = window.localStorage.getItem("client");
  const accessToken = window.localStorage.getItem("access-token");

  return axios
    .get("http://localhost:3000/auth/validate_token", {
      headers: {
        uid: uid,
        "access-token": accessToken,
        client: client,
      },
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};

const useValidate = () => {
  return { validate };
};

export default useValidate;
