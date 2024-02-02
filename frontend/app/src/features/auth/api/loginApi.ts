import { AxiosResponse } from "axios";
import client from "lib/client";
import { LoginData } from "../types/auth";
import { User } from "../types/user";

const loginApi = (data: LoginData): Promise<AxiosResponse<{ data: User }>> =>
  client.post("auth/sign_in", data);
export default loginApi;
