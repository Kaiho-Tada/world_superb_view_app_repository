import { AxiosResponse } from "axios";
import client from "lib/client";
import Video from "../types/Video";

const searchVideoApi = (): Promise<AxiosResponse<Video[]>> => client.get("/videos/search");

export default searchVideoApi;
