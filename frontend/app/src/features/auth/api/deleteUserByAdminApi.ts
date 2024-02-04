import { AxiosResponse } from "axios";
import client from "lib/client";

const deleteUserByAdminApi = (userId: number): Promise<AxiosResponse<{ message: string }>> =>
  client.delete(`/auth/users/${userId}`);

export default deleteUserByAdminApi;
