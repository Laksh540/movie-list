import { TMDB_API_KEY } from "../constants";
import BaseService from "./BaseService";

// const url = "/adhoc/getSampleJdJSON";
class MovieService extends BaseService {
  getGenresList() {
    let url = `/genre/movie/list?api_key=${TMDB_API_KEY}`;
    return this.getRequest(url);
  }
}

export default new MovieService();
