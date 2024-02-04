import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import client from "lib/client";
import { User } from "../types/user";

const getCurrentUserApi = (): Promise<AxiosResponse<{ status: number; currentUser?: User }>> =>
  client.get("auth/sessions", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
export default getCurrentUserApi;
