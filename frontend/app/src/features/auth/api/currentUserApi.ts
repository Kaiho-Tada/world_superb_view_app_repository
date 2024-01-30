import Cookies from "js-cookie";
import client from "lib/client";

const getCurrentUserApi = () =>
  client.get("auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
export default getCurrentUserApi;
