import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import client from "lib/client";
import { UpdateUserData } from "../types/auth";
import { User } from "../types/user";

const updateUserApi = (data: UpdateUserData): Promise<AxiosResponse<{ data: User }>> =>
  client.put("auth", data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
export default updateUserApi;
