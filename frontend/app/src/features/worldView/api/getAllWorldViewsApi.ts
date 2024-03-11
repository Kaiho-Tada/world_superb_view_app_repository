import { AxiosResponse } from "axios";
import client from "lib/client";
import { WorldView } from "../types/api/worldView";

const getAllWorldViewsApi = (): Promise<AxiosResponse<WorldView[]>> => client.get("/world_views");
export default getAllWorldViewsApi;
