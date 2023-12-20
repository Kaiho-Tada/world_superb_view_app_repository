import Cookies from "js-cookie";
import client from "./client";

const worldViewFavoriteApi = () => {
  const createFavoriteApi = (selectedId: number) =>
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

  const deleteFavoriteApi = (favoriteId: number) =>
    client.delete(`/world_view_favorites/${favoriteId}`);
  return { createFavoriteApi, deleteFavoriteApi };
};
export default worldViewFavoriteApi;
