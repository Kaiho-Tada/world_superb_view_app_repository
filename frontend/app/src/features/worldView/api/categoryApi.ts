import { AxiosResponse } from "axios";
import client from "lib/client";
import { Category } from "../types/api/category";

const getAllCategoriesApi = (): Promise<AxiosResponse<Category[]>> => client.get("/categories");

export default getAllCategoriesApi;
