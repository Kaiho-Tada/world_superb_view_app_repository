import { Image } from "@chakra-ui/react";
import likedHeartIcon from "assets/likedHeartIcon.png";
import unlikedHeartIcon from "assets/unlikedHeartIcon.png";
import { AxiosResponse } from "axios";
import useHandleChangeFavorite from "hooks/api/useHandleChangeFavorite";
import { useAuth } from "providers/useAuthProvider";
import { FC, useEffect, useState } from "react";
import { Favorite } from "types/favorite";

type FavoriteProps = {
  selectedId: number;
  favorites: Array<Favorite>;
  deleteFavoriteApi: (favoriteId: number) => Promise<AxiosResponse<any, any>>;
  createFavoriteApi: (selectedId: number) => Promise<AxiosResponse<any, any>>;
};

const FavoriteIcon: FC<FavoriteProps> = (props) => {
  const { selectedId, favorites, deleteFavoriteApi, createFavoriteApi } = props;
  const { currentUser } = useAuth();
  const [favoriteId, setFavoriteId] = useState<number | null>(null);
  const { handleChangeFavorite } = useHandleChangeFavorite();

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
      boxSize="20px"
      mr="5"
      mb="3"
      alt="ハートアイコン"
      position="absolute"
      bottom="0"
      right="0"
      onClick={() =>
        handleChangeFavorite({
          selectedId,
          favoriteId,
          setFavoriteId,
          deleteFavoriteApi,
          createFavoriteApi,
        })
      }
      cursor="pointer"
    />
  );
};

export default FavoriteIcon;
