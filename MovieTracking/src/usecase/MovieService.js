const SearchMovie = require('../domain/SearchMovie');
const DetailMovie = require('../domain/DetailMovie');
const MovieRepository = require('../adapter/db/pure/MovieRepository');

class MovieService {
  constructor({ movieRepository }) {
    this.movieRepository = movieRepository;
    if (!(this.movieRepository instanceof MovieRepository)) {
      throw new TypeError('Invalid argument(s) type');
    }
  }

  /**
   * SearchMovie
   * @param {string} s search keyword
   * @param {number} page page number
   */
  async SearchMovie(s, page) {
    const { movieRepository } = this;
    const movie = new SearchMovie(s, page);
    const result = await movieRepository.searchMovie(movie);
    return result;
  }
  /**
   * DetailMovie
   * @param {string} i id movie
   * @param {number} plot short, full
   */
  async DetailMovie(i, plot) {
    const { movieRepository } = this;
    const detail = new DetailMovie(i, plot);
    const result = await movieRepository.detailMovie(detail);
    return result;
  }
}

module.exports = MovieService;
