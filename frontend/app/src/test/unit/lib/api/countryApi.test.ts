import MockAdapter from "axios-mock-adapter";
import client from "lib/api/client";
import getAllCountriesApi from "lib/api/countryApi";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/countries").reply(200, [
  { id: 1, name: "アメリカ", state: { id: 1, name: "北米" } },
  { id: 2, name: "中国", state: { id: 2, name: "アジア" } },
]);

test("getAllCountriesApi関数が意図したURLにGETリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await getAllCountriesApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([
    { id: 1, name: "アメリカ", state: { id: 1, name: "北米" } },
    { id: 2, name: "中国", state: { id: 2, name: "アジア" } },
  ]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/countries");
});
