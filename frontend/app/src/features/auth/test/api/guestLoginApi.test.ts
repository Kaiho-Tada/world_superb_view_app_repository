import MockAdapter from "axios-mock-adapter";
import guestLoginApi from "features/auth/api/guestLoginApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onPost("/auth/sessions/guest_login").reply(200, {
  status: 200,
  data: { id: 1, email: "guest@example.com" },
});

test("guestLoginApi関数が意図したURLにPOSTリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await guestLoginApi();
  expect(response.status).toBe(200);
  expect(response.data.data).toEqual({ id: 1, email: "guest@example.com" });
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("post");
  expect(response.config.url).toBe("/auth/sessions/guest_login");
});
