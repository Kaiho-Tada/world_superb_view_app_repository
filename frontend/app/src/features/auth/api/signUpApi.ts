import { AxiosResponse } from "axios";
import { SignUpData } from "features/auth/types/auth";
import client from "lib/client";

const signUpApi = (data: SignUpData): Promise<AxiosResponse<void>> => client.post("auth", data);
export default signUpApi;
