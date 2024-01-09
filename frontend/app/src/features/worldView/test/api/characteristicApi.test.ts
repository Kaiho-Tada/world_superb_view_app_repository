import MockAdapter from "axios-mock-adapter";
import getAllCharacteristicsApi from "features/worldView/api/characteristicApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/characteristics").reply(200, [
  { id: 1, name: "奇妙・不思議" },
  { id: 2, name: "ロマンチック" },
]);

test("getAllCharacteristicsApi関数が意図したURLにGETリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await getAllCharacteristicsApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([
    { id: 1, name: "奇妙・不思議" },
    { id: 2, name: "ロマンチック" },
  ]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/characteristics");
});
