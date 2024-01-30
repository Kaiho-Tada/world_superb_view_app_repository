import MockAdapter from "axios-mock-adapter";
import loginApi from "features/auth/api/loginApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);

mockAxios.onPost("/auth/sign_in").reply((config) => {
  const data = JSON.parse(config.data);
  return [200, data];
});

test("loginApi関数が意図したURLにPOSTリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await loginApi({
    email: "test@example.com",
    password: "password",
  });
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ email: "test@example.com", password: "password" });
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("post");
  expect(response.config.url).toBe("auth/sign_in");
});
