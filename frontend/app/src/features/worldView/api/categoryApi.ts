import { AxiosResponse } from "axios";
import client from "lib/client";
import Cateogry from "../types/api/category";

const getAllCategoriesApi = (): Promise<AxiosResponse<Cateogry[]>> => client.get("/categories");

export default getAllCategoriesApi;
