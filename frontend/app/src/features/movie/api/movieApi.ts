import { AxiosResponse } from "axios";
import client from "lib/client";
import Movie from "../types/Movie";

const searchMovieApi = (): Promise<AxiosResponse<Movie[]>> => client.get("/movies/search");

export default searchMovieApi;
