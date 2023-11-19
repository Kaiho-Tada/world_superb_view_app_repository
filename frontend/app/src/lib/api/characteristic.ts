import client from "./client";

const getAllCharacteristicsApi = () => client.get("/characteristics");

export default getAllCharacteristicsApi;
