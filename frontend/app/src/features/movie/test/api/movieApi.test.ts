import MockAdapter from "axios-mock-adapter";
import getAllMoviesApi from "features/movie/api/movieApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/movies/search").reply(200, [
  { id: 1, title: "title1" },
  { id: 2, title: "title2" },
]);

test("searchMovieApi関数が意図したURLにGETリクエストを送信し、意図したステイタスコードとデータが返されること", async () => {
  const response = await getAllMoviesApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([
    { id: 1, title: "title1" },
    { id: 2, title: "title2" },
  ]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/movies/search");
});
