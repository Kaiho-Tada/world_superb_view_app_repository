import { LoginData, SignUpData } from "types/api/auth";
import client from "./client";

export const signUp = (data: SignUpData) => {
  return client.post("auth", data);
};

export const login = (data: LoginData)  => {
  return client.post("auth/sign_in", data);
};
