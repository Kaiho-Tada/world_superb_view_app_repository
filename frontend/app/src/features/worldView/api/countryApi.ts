import { AxiosResponse } from "axios";
import client from "lib/client";
import Country from "../types/api/country";

const getAllCountriesApi = (): Promise<AxiosResponse<Country[]>> => client.get("/countries");

export default getAllCountriesApi;
