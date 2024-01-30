import Cookies from "js-cookie";
import client from "lib/client";

export const deleteUser = () =>
  client.delete("auth", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });

export const guestLogin = () => client.post("/auth/sessions/guest_login");
