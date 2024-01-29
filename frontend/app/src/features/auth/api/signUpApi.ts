import { SignUpData } from "features/auth/types/auth";
import client from "lib/client";

const signUp = (data: SignUpData) => client.post("auth", data);
export default signUp;
