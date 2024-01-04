import { RefCategory } from "types/ref/refCategory";
import { RefCharacteristic } from "types/ref/refCharacteristic";
import { RefCountry } from "types/ref/refCountry";
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
};
