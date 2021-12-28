import axios from "axios";

const instance = axios.create({
  baseURL: "https://gp-server.hunger-valley.com",
  headers: {
    "t-app-id": "iZVR6tUtn52akRXJbe1rf8Xf",
    "t-app-secret": "rkQ8cvUuHAkcmjnEWfZujxJe",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    let xToken = localStorage.getItem("x-token");
    if (xToken) {
      config.headers["Authorization"] = `Bearer ${xToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    console.error(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.headers["x-token"]) {
      localStorage.setItem("x-token", response.headers["x-token"]);
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.error(error);
    return Promise.reject(error);
  }
);

export default instance;
