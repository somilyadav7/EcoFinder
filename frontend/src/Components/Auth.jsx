import axios from "axios";
const AUTH_REST_API_BASE_URL = "http://localhost:8080/api/auth";

export const registerAPICall = (registerObj) =>
  axios.post(AUTH_REST_API_BASE_URL + "/signup", registerObj);
export const loginAPICall = (usernameOrEmail, password) =>
  axios.post(AUTH_REST_API_BASE_URL + "/signin", { usernameOrEmail, password });
export const adminLoginAPICall = (usernameOrEmail, password) =>
  axios.post(AUTH_REST_API_BASE_URL + "/adminsignin", {
    usernameOrEmail,
    password,
  });

export const isAuthenticated = () => {
  return !!getToken();
};

export const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/signin";
};

export const setUserID = (id) => {
  localStorage.setItem("id", id);
};

export const getUserID = () => {
  return localStorage.getItem("id");
};

export const setUserName = (username) => {
  localStorage.setItem("username", username);
  //console.log("Username:"+ localStorage.getItem('username'));
};

export const getUserName = () => {
  //console.log("Username:"+ localStorage.getItem('username'))
  return localStorage.getItem("username");
};

export const setFullname = (fullname) => {
  localStorage.setItem("fullname", fullname);
};

export const getFullname = () => {
  return localStorage.getItem("fullname");
};

export const setEmail = (email) => {
  localStorage.setItem("email", email);
  console.log("Email:" + localStorage.getItem("email"));
};

export const getEmail = () => {
  return localStorage.getItem("email");
};

export const setPhoneNumber = (phoneNumber) => {
  localStorage.setItem("phoneNumber", phoneNumber);
};

export const getPhoneNumber = () => {
  return localStorage.getItem("phoneNumber");
};
export const setToken = (token) => {
    localStorage.setItem("token", token);
  };
  
  export const getToken = () => {
    return localStorage.getItem("token");
  };