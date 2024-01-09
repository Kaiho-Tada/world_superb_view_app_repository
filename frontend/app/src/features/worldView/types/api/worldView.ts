import { RefCategory } from "features/worldView/types/ref/refCategory";
import { RefCharacteristic } from "features/worldView/types/ref/refCharacteristic";
import { RefCountry } from "features/worldView/types/ref/refCountry";
import { WorldViewFavorite } from "./worldViewFavorite";

export type WorldView = {
  id: number;
  name: string;
  imgUrl: string | null;
  bestSeason: string;
  countries: Array<RefCountry>;
  categories: Array<RefCategory>;
  characteristics: Array<RefCharacteristic>;
  worldViewFavorites: Array<WorldViewFavorite>;
  gifUrl: string | null;
  gifSite: string | null;
};
