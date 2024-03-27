import Genre from "./Genre";

type Video = {
  id: number;
  title: string;
  posterPath: string;
  popularity: number;
  voteAverage: number;
  releaseDate: string;
  overview: string;
  budget?: number;
  revenue?: number;
  isMovie: boolean;
  worldViews: {
    id: number;
    name: string;
    imgUrl: string;
    countries: { id: number; name: string }[];
    latitude: number;
    longitude: number;
  }[];
  genres: Genre[];
};

export default Video;
