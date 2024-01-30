import MockAdapter from "axios-mock-adapter";
import updateUserApi from "features/auth/api/updateUserApi";
import Cookies from "js-cookie";
import client from "lib/client";

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  get: jest.fn(),
}));
const mockAxios = new MockAdapter(client);
mockAxios.onPut("auth").reply((config) => {
  const data = JSON.parse(config.data);
  return [200, { data }];
});

test("updateUserApi関数が意図したURLにPUTリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await updateUserApi({
    name: "updateName",
    nickname: "updateNickName",
    email: "updateEmail",
  });
  expect(Cookies.get).toHaveBeenCalledWith("_access_token");
  expect(Cookies.get).toHaveBeenCalledWith("_client");
  expect(Cookies.get).toHaveBeenCalledWith("_uid");
  expect(response.status).toBe(200);
  expect(response.data.data).toEqual({
    name: "updateName",
    nickname: "updateNickName",
    email: "updateEmail",
  });
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("put");
  expect(response.config.url).toBe("auth");
});
