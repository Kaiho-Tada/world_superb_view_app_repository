import client from "lib/client";

const getAllCharacteristicsApi = () => client.get("/characteristics");

export default getAllCharacteristicsApi;
