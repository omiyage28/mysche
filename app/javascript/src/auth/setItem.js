const setItem = (headers, name) => {
  localStorage.setItem("access-token", headers["access-token"]);
  localStorage.setItem("client", headers["client"]);
  localStorage.setItem("uid", headers["uid"]);
  localStorage.setItem("name", name);
};

export default setItem;
