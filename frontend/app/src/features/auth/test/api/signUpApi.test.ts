import MockAdapter from "axios-mock-adapter";
import signUp from "features/auth/api/signUpApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);

mockAxios.onPost("/auth").reply((config) => {
  const data = JSON.parse(config.data);
  return [200, { email: data.email, password: data.password }];
});

test("signUp関数が意図したURLにPOSTリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await signUp({
    email: "test@example.com",
    password: "password",
    confirm_success_url: "confirm_success_url",
  });
  expect(response.status).toBe(200);
  expect(response.data).toEqual({ email: "test@example.com", password: "password" });
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("post");
  expect(response.config.url).toBe("auth");
});
