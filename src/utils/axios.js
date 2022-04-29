const axios = require("axios").default;

const instance = axios.create({
  baseURL: "http://127.0.0.1:5000/api",
  timeout: 10000,
});

export default instance;
