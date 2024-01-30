import Cookies from "js-cookie";
import client from "lib/client";

const deleteUserApi = () =>
  client.delete("auth", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });

export default deleteUserApi;
