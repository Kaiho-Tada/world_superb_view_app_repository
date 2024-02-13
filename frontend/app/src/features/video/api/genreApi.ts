import { AxiosResponse } from "axios";
import client from "lib/client";
import Genre from "../types/Genre";

const getAllGenresApi = (): Promise<AxiosResponse<Genre[]>> => client.get("/genres");

export default getAllGenresApi;
