import MockAdapter from "axios-mock-adapter";
import deleteUserApi from "features/auth/api/deleteUserApi";
import Cookies from "js-cookie";
import client from "lib/client";

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  get: jest.fn(),
}));

const mockAxios = new MockAdapter(client);
mockAxios.onDelete("auth").reply(200);

test("deleteUserApi関数が意図したURLにDELETEリクエストを送信し、意図したステイタスコードが返されること", async () => {
  const response = await deleteUserApi();
  expect(Cookies.get).toHaveBeenCalledWith("_access_token");
  expect(Cookies.get).toHaveBeenCalledWith("_client");
  expect(Cookies.get).toHaveBeenCalledWith("_uid");
  expect(response.status).toBe(200);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("delete");
  expect(response.config.url).toBe("auth");
});
