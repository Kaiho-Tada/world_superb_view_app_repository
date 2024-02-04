import MockAdapter from "axios-mock-adapter";
import getCurrentUserApi from "features/auth/api/currentUserApi";
import Cookies from "js-cookie";
import client from "lib/client";

jest.mock("js-cookie", () => ({
  ...jest.requireActual("js-cookie"),
  get: jest.fn(),
}));
const mockAxios = new MockAdapter(client);
mockAxios.onGet("auth/sessions").reply(200, {
  status: 200,
  currentUser: {
    id: 1,
    email: "test@example.com",
    name: "name",
    nickanme: "nickname",
  },
});

test("getCurrentUserApi関数が意図したURLにGETリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await getCurrentUserApi();
  expect(Cookies.get).toHaveBeenCalledWith("_access_token");
  expect(Cookies.get).toHaveBeenCalledWith("_client");
  expect(Cookies.get).toHaveBeenCalledWith("_uid");
  expect(response.status).toBe(200);
  expect(response.data.currentUser).toEqual({
    id: 1,
    email: "test@example.com",
    name: "name",
    nickanme: "nickname",
  });
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("auth/sessions");
});
