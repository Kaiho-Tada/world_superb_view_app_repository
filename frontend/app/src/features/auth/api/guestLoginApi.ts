import client from "lib/client";

const guestLoginApi = () => client.post("/auth/sessions/guest_login");
export default guestLoginApi;
