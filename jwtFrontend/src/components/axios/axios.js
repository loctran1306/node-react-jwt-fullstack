import axios from "axios";
import { toast } from "react-toastify";
// Set config defaults when creating the instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});
axiosInstance.defaults.withCredentials = true;
// Alter defaults after instance has been created
axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${localStorage.getItem("jwt")}`;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return error;
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger

    // Do something with response data
    return response;
  },
  function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = (err && err.response && err.response?.status) || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Unauthorized the user, Please Loggin");
        // window.location.href = "/login";
        return;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("You don't permisson access this resource....");
        return;
      }

      // bad request
      case 400: {
        toast.error("bad request");
        return;
      }

      // not found
      case 404: {
        toast.error("Page not Found");
        return;
      }

      // conflict
      case 409: {
        toast.error("................409");
        return;
      }

      // unprocessable
      case 422: {
        toast.error("...............422");
        return;
      }

      // generic api error (server related) unexpected
      default: {
        toast.error("................ERROR");
        return;
      }
    }
    // Do something with response error
    // return Promise.reject(error);
  }
);

export default axiosInstance;
