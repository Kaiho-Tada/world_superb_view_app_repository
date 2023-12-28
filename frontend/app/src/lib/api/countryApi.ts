import client from "./client";

const getAllCountriesApi = () => client.get("/countries");

export default getAllCountriesApi;
