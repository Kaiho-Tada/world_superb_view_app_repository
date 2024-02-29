import { AxiosResponse } from "axios";
import client from "lib/client";
import Characteristic from "../types/api/characteristic";

const getAllCharacteristicsApi = (): Promise<AxiosResponse<Characteristic[]>> =>
  client.get("/characteristics");

export default getAllCharacteristicsApi;
