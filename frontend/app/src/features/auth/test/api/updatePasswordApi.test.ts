import MockAdapter from "axios-mock-adapter";
import updatePasswordApi from "features/auth/api/updatePasswordApi";
import Cookies from "js-cookie";
import client from "lib/client";

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  get: jest.fn(),
}));

const mockAxios = new MockAdapter(client);
mockAxios.onPut("auth/password").reply(200, { message: "パスワードの更新に成功しました。" });

test("updatePasswordApi関数が意図したURLにPUTリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await updatePasswordApi({
    password: "password",
    passwordConfirmation: "password",
  });
  expect(Cookies.get).toHaveBeenCalledWith("_access_token");
  expect(Cookies.get).toHaveBeenCalledWith("_client");
  expect(Cookies.get).toHaveBeenCalledWith("_uid");
  expect(response.status).toBe(200);
  expect(response.data.message).toBe("パスワードの更新に成功しました。");
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("put");
  expect(response.config.url).toBe("auth/password");
});
