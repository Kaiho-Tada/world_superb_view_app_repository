import { LoginData, SignUpData, UpdatePasswordData, UpdateUserData } from "types/api/auth";
import client from "./client";
import Cookies from "js-cookie";

export const signUp = (data: SignUpData) => {
  return client.post("auth", data);
};

export const login = (data: LoginData)  => {
  return client.post("auth/sign_in", data);
};

export const signout = () => {
  return client.delete("auth/sign_out", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }});
};

export const getCurrentUser = () => {
  return client.get("auth/sessions", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }});
};

export const updateUser = (data: UpdateUserData) => {
  return client.put("auth", data, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }});
};

export const updatePassword = (data: UpdatePasswordData) => {
  return client.put("auth/password", data, { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }});
};

export const deleteUser = () => {
  return client.delete("auth", { headers: {
    "access-token": Cookies.get("_access_token"),
    "client": Cookies.get("_client"),
    "uid": Cookies.get("_uid")
  }});
};
