import { AxiosResponse } from "axios";
import client from "lib/client";
import { Country } from "../types/api/country";

const getAllCountriesApi = (): Promise<AxiosResponse<Pick<Country, "id" | "name" | "parent">[]>> =>
  client.get("/countries");

export default getAllCountriesApi;
