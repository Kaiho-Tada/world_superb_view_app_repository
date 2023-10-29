import client from "./client";

const getAllSuperbViewsApi = () => client.get("/superb_views");

export default getAllSuperbViewsApi;
