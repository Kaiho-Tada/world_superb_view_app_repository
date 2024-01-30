import Cookies from "js-cookie";
import client from "lib/client";
import { UpdateUserData } from "../types/auth";

const updateUserApi = (data: UpdateUserData) =>
  client.put("auth", data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
export default updateUserApi;
