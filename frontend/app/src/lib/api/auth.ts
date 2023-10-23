import Cookies from "js-cookie";
import { LoginData, SignUpData, UpdatePasswordData, UpdateUserData } from "types/api/auth";
import client from "./client";

export const signUp = (data: SignUpData) => client.post("auth", data);

export const login = (data: LoginData) => client.post("auth/sign_in", data);

export const signout = () =>
  client.delete("auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });

export const getCurrentUser = () =>
  client.get("auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });

export const updateUser = (data: UpdateUserData) =>
  client.put("auth", data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });

export const updatePassword = (data: UpdatePasswordData) =>
  client.put("auth/password", data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });

export const deleteUser = () =>
  client.delete("auth", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });

export const guestLogin = () => client.post("/auth/sessions/guest_login");
