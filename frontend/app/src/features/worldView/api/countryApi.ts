import client from "lib/client";

const getAllCountriesApi = () => client.get("/countries");

export default getAllCountriesApi;
