import client from "lib/client";

const getAllCategoriesApi = () => client.get("/categories");

export default getAllCategoriesApi;
