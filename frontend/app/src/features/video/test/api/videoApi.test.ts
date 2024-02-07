import MockAdapter from "axios-mock-adapter";
import searchVideoApi from "features/video/api/videoApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/videos/search").reply(200, [
  { id: 1, title: "title1" },
  { id: 2, title: "title2" },
]);

test("searchMovieApi関数が意図したURLにGETリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await searchVideoApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([
    { id: 1, title: "title1" },
    { id: 2, title: "title2" },
  ]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/videos/search");
});
