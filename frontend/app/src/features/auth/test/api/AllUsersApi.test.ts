import MockAdapter from "axios-mock-adapter";
import getAllUsersApi from "features/auth/api/AllUsersApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/auth/users").reply(200, [
  { id: 1, name: "user1", email: "user1@example.com" },
  { id: 2, name: "user2", email: "user2@example.com" },
]);

test("getAllUsersApi関数が意図したURLにGETリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await getAllUsersApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([
    { id: 1, name: "user1", email: "user1@example.com" },
    { id: 2, name: "user2", email: "user2@example.com" },
  ]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/auth/users");
});
