import { Image } from "@chakra-ui/react";
import likedHeartIcon from "assets/likedHeartIcon.png";
import unlikedHeartIcon from "assets/unlikedHeartIcon.png";
import { AxiosResponse } from "axios";
import useChangeFavorite from "hooks/api/useChangeFavorite";
import { useAuth } from "providers/useAuthProvider";
import { FC, useEffect, useState } from "react";
import { Favorite } from "types/favorite";

type FavoriteProps = {
  selectedId: number;
  favorites: Array<Favorite>;
  deleteFavoriteApi: (favoriteId: number) => Promise<AxiosResponse<void>>;
  createFavoriteApi: (selectedId: number) => Promise<AxiosResponse<Favorite>>;
  handleGetModel: () => void;
};

const FavoriteIcon: FC<FavoriteProps> = (props) => {
  const { selectedId, favorites, deleteFavoriteApi, createFavoriteApi, handleGetModel } = props;
  const { currentUser } = useAuth();
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const { handleChangeFavorite } = useChangeFavorite();

  // コンポーネント初期化時に、currentUserがお気に入り登録しているかを確認し、している場合はfavoriteIdをそのFavoriteのidに更新。
  useEffect(() => {
    const userFavorite = favorites.find(
      (favorite) => currentUser && favorite.userId === currentUser.id
    );
    if (userFavorite) {
      setFavoriteId(userFavorite.id);
    }
  }, []);
  return (
    <Image
      src={favoriteId ? likedHeartIcon : unlikedHeartIcon}
      boxSize="25px"
      alt="ハートアイコン"
      onClick={() => {
        handleChangeFavorite({
          selectedId,
          favoriteId,
          setFavoriteId,
          deleteFavoriteApi,
          createFavoriteApi,
        });
        handleGetModel();
      }}
      cursor="pointer"
    />
  );
};

export default FavoriteIcon;
