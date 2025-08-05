import Cookies from "js-cookie";
import axiosPrivet from "./axiosPrivet";

export const accessToken = "client_accessToken";

// set cookie
export const setCookie = (cookieName, value) => {
  Cookies.set(cookieName, value, {
    expires: 1,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};

// get cookie
export const getCookie = (cookieName) => {
  return Cookies.get(cookieName);
};

//remove cookie
export const removeCookie = async (cookieName) => {
  await axiosPrivet.delete("login");
  Cookies.remove(cookieName);
};