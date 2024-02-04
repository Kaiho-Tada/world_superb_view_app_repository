import { AxiosResponse } from "axios";
import client from "lib/client";
import { User } from "../types/user";

const guestLoginApi = (): Promise<AxiosResponse<{ data: User }>> =>
  client.post("/auth/sessions/guest_login");
export default guestLoginApi;
