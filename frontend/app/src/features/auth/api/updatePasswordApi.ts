import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import client from "lib/client";
import { UpdatePasswordData } from "../types/auth";

const updatePasswordApi = (data: UpdatePasswordData): Promise<AxiosResponse<{ message: string }>> =>
  client.put("auth/password", data, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
export default updatePasswordApi;
