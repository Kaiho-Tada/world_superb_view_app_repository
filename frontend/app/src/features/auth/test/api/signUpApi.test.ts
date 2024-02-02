import MockAdapter from "axios-mock-adapter";
import signUpApi from "features/auth/api/signUpApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onPost("/auth").reply(200);

test("signUpApi関数が意図したURLにPOSTリクエストを送信し、意図したステイタスコードが返されること", async () => {
  const response = await signUpApi({
    email: "test@example.com",
    password: "password",
    confirm_success_url: "confirm_success_url",
  });
  expect(response.status).toBe(200);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("post");
  expect(response.config.url).toBe("auth");
});
