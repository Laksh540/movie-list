import { TMDB_API_KEY } from "../constants";
import BaseService from "./BaseService";

// const url = "/adhoc/getSampleJdJSON";
class MovieService extends BaseService {
  getGenresList() {
    let url = `/genre/movie/list?api_key=${TMDB_API_KEY}`;
    return this.getRequest(url);
  }
  //&primary_release_year=2023&page=1
  getMovieList(search: string) {
    let url = `/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&vote_count.gte=100&with_cast=${search}`;
    return this.getRequest(url);
  }

  getMovieCredits(movieId: number) {
    let url = `/movie/${movieId}/credits?api_key=${TMDB_API_KEY}&cast.known_for_department=Acting`;
    return this.getRequest(url);
  }

  searchMovieByName(search: string) {
    let url = `/search/movie?api_key=${TMDB_API_KEY}${search}`;
    return this.getRequest(url);
  }
}

export default new MovieService();
