import { LoginData, UpdatePasswordData, UpdateUserData } from "features/auth/types/auth";
import Cookies from "js-cookie";
import client from "lib/client";

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
