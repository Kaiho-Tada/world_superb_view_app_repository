import { AxiosResponse } from "axios";
import client from "lib/client";
import { User } from "../types/user";

const getAllUsersApi = (): Promise<AxiosResponse<User[]>> => client.get("/auth/users");
export default getAllUsersApi;
