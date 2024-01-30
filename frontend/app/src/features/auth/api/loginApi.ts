import client from "lib/client";
import { LoginData } from "../types/auth";

const loginApi = (data: LoginData) => client.post("auth/sign_in", data);
export default loginApi;
