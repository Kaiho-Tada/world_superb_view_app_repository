import Cookies from "js-cookie";
import client from "lib/client";

export const createFavoriteApi = (selectedId: number) =>
  client.post(
    "/world_view_favorites",
    {
      worldViewFavorites: {
        worldViewId: selectedId,
      },
    },
    {
      headers: {
        "access-token": Cookies.get("_access_token"),
        client: Cookies.get("_client"),
        uid: Cookies.get("_uid"),
      },
    }
  );

export const deleteFavoriteApi = (favoriteId: number) =>
  client.delete(`/world_view_favorites/${favoriteId}`);
