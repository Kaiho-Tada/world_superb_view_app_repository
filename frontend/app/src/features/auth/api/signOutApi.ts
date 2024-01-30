import Cookies from "js-cookie";
import client from "lib/client";

const signout = () =>
  client.delete("auth/sign_out", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
export default signout;
