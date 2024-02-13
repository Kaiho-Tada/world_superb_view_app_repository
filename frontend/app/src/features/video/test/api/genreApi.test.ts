import MockAdapter from "axios-mock-adapter";
import getAllGenresApi from "features/video/api/genreApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/genres").reply(200, [
  { id: 1, name: "genre1" },
  { id: 2, name: "genre2" },
]);

test("getAllGenresApi関数が意図したURLにGETリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await getAllGenresApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([
    { id: 1, name: "genre1" },
    { id: 2, name: "genre2" },
  ]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/genres");
});
