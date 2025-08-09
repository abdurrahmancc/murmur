import axios from "axios";
import Cookies from "js-cookie";
import { accessToken } from "./useCookies";


const axiosPrivet = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/",
});

axiosPrivet.interceptors.request.use(
  function (config) {
    if (!config.headers.authorization) {
      config.headers.authorization = `Bearer ${Cookies.get(accessToken)}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


axiosPrivet.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error?.response?.status === 403) {
      //
    }
    return Promise.reject(error);
  }
);

export default axiosPrivet;
