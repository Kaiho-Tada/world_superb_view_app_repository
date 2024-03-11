import MockAdapter from "axios-mock-adapter";
import getAllWorldViewsApi from "features/worldView/api/getAllWorldViewsApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/world_views").reply(200, [
  { id: 1, name: "world_view1" },
  { id: 2, name: "world_view2" },
]);

test("getAllWorldViewsApi関数が意図したURLにGETリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await getAllWorldViewsApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([
    { id: 1, name: "world_view1" },
    { id: 2, name: "world_view2" },
  ]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/world_views");
});
