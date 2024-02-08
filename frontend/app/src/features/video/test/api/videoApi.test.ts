import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useVideoApi from "features/video/api/videoApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);
mockAxios.onGet("/videos/search").reply(200, [
  { id: 1, title: "title1" },
  { id: 2, title: "title2" },
]);

jest.mock("providers/VideoListProvider", () => ({
  useVideoListContext: () => ({
    state: {
      sortCriteria: "popularity",
    },
  }),
}));

test("searchMovieApi関数が意図したURLにGETリクエストとparamsを送信し、意図したステイタスコードとデータが返されること", async () => {
  const { result } = renderHook(() => useVideoApi());
  const response = await result.current.searchVideoApi();
  expect(response.status).toBe(200);
  expect(response.data).toEqual([
    { id: 1, title: "title1" },
    { id: 2, title: "title2" },
  ]);
  expect(response.config.baseURL).toBe("http://localhost:3001/api/v1");
  expect(response.config.params).toEqual({ sort_criteria: "popularity" });
  expect(response.config.method).toBe("get");
  expect(response.config.url).toBe("/videos/search");
});
