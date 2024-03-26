import Video from "features/video/types/Video";
import { Category } from "features/worldView/types/api/category";
import { Characteristic } from "features/worldView/types/api/characteristic";
import { Country } from "features/worldView/types/api/country";
import { Favorite } from "types/favorite";

export type WorldView = {
  id: number;
  name: string;
  imgUrl: string | null;
  bestSeason: string;
  countries: Omit<Country, "parent">[];
  categories: Omit<Category, "parent">[];
  characteristics: Characteristic[];
  worldViewFavorites: Favorite[];
  gifUrl: string | null;
  gifSite: string | null;
  videos: Video[];
  latitude: number;
  longitude: number;
};
