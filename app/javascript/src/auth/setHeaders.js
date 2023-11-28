const headers = () => {
  const token = localStorage.getItem("access-token");
  const client = localStorage.getItem("client");
  const uid = localStorage.getItem("uid");
  return {
    headers: {
      "access-token": token,
      client,
      uid,
    },
  };
};

export default headers;
