import client from "./client";

const getAllCategoriesApi = () => client.get("/categories");

export default getAllCategoriesApi;
