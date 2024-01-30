import { SignUpData } from "features/auth/types/auth";
import client from "lib/client";

const signUpApi = (data: SignUpData) => client.post("auth", data);
export default signUpApi;
