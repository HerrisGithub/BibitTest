const Joi = require('@hapi/joi');
const MovieService = require('../../../usecase/MovieService');
const { BusinessError, ErrorCode } = require('../error');

class MovieController {
  /**
   * @constructor
   * @param {Object} param
   * @param {Object} param.movieService
   */
  constructor({ movieService }) {
    if (!(movieService instanceof MovieService)) {
      throw new TypeError('Invalid argument(s) type');
    }
    this.movieService = movieService;
  }

  /**
   * Search movie
   */
  searchMovie() {
    const { movieService } = this;
    return async (req, res) => {
      const movie = await movieService.SearchMovie(req.query.s, req.query.page);
      res.status(200).json({
        status: 200,
        data: movie,
      });
    };
  }
  detailMovie() {
    const { movieService } = this;
    return async (req, res) => {
      const movie = await movieService.DetailMovie(req.params.id, req.query.plot);
      res.status(200).json({
        status: 200,
        data: movie,
      });
    };
  }
}

module.exports = MovieController;
