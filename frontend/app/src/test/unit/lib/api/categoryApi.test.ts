import MockAdapter from "axios-mock-adapter";
import getAllCategoriesApi from "lib/api/categoryApi";
import client from "lib/api/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/categories").reply(200, [
  { id: 1, name: "category1", classification: "滝" },
  { id: 2, name: "category2", classification: "湖" },
]);

test("getAllCategoriesApi関数が意図したURLにGETリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await getAllCategoriesApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([
    { id: 1, name: "category1", classification: "滝" },
    { id: 2, name: "category2", classification: "湖" },
  ]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/categories");
});
