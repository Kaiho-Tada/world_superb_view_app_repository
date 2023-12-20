import { Image } from "@chakra-ui/react";
import useHandleChangeFavorite from "hooks/api/worldView/favorite/useHandleChangeFavorite";
import { useAuth } from "hooks/providers/useAuthProvider";
import likedHeartIcon from "img/likedHeartIcon.png";
import unlikedHeartIcon from "img/unlikedHeartIcon.png";
import { FC, useEffect, useState } from "react";
import { WorldViewFavorite } from "types/api/worldViewFavorite";

type FavoriteProps = {
  selectedId: number;
  favorites: Array<WorldViewFavorite>;
};

const Favorite: FC<FavoriteProps> = ({ selectedId, favorites }) => {
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
        })
      }
      cursor="pointer"
    />
  );
};

export default Favorite;
