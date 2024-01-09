import { renderHook } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import worldViewFavoriteApi from "features/worldView/api/worldViewFavoriteApi";
import client from "lib/client";

const mockAxios = new MockAdapter(client);

test("createFavoriteApi関数が正しいデータでPOSTリクエストを送信し、意図したステイタスコードが返されること", async () => {
  const selectedId = 101;
  mockAxios.onPost("/world_view_favorites").reply(201);
  const { result } = renderHook(() => worldViewFavoriteApi());
  const response = await result.current.createFavoriteApi(selectedId);
  expect(mockAxios.history.post.length).toBe(1);
  expect(mockAxios.history.post[0].url).toBe("/world_view_favorites");
  expect(mockAxios.history.post[0].data).toBe(
    JSON.stringify({ world_view_favorites: { world_view_id: 101 } })
  );
  expect(response.status).toBe(201);
});

test("deleteFavoriteApi関数が意図したURLにDELETEリクエストを送信し、意図したステイタスコードが返されること", async () => {
  const favoriteId = 102;
  mockAxios.onDelete(`/world_view_favorites/${favoriteId}`).reply(204);
  const { result } = renderHook(() => worldViewFavoriteApi());
  const response = await result.current.deleteFavoriteApi(favoriteId);
  expect(mockAxios.history.delete.length).toBe(1);
  expect(mockAxios.history.delete[0].url).toBe(`/world_view_favorites/${favoriteId}`);
  expect(response.status).toBe(204);
});
