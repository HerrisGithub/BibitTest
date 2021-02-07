const DB = require('../../../infrastructure/db/pure/DB');
const SearchMovie = require('../../../domain/SearchMovie');
const DetailMovie = require('../../../domain/DetailMovie');
const rp = require('request-promise');
const config = require('../../../infrastructure/config.json');

/**
 * Movie dao
 */
class MovieRepository {
  /**
   * @constructor
   * @param {Object} db database infrastructure
   */
  constructor(db, logModel) {
    if (!(db instanceof DB)) {
      throw new Error('Invalid argument(s) type');
    }
    this.db = db;
    this.logModel = logModel;
    this.table = `${db.schema}.member`;
  }
  /**
   * Search movie from omdbapi
   * @param {Object} movie
   */
  async searchMovie(movie) {
    if (!(movie instanceof SearchMovie)) {
      throw new Error('Invalid argument(s) type');
    }
    const { s, page } = movie;
    const options = {
      uri: `${config.omdbapi.host}/`,
      qs: {
        apikey: config.omdbapi.key,
        s: s,
        page: page
      },
      resolveWithFullResponse: true
    };
    let result = await rp(options);
    result = result.toJSON();
    const model = await this.logModel
    model.create({
      URL: result.request.uri.href,
      Response: JSON.parse(result.body),
      Params: result.request.uri.path,
      TypeRequest: 'Search'
    })
    return {
      status: result.statusCode,
      body: JSON.parse(result.body),
    }
  }
   /**
   *  Search movie detail from omdbapi
   * @param {Object} detail
   */
  async detailMovie(detail) {
    if (!(detail instanceof DetailMovie)) {
      throw new Error('Invalid argument(s) type');
    }
    const { i, plot} = detail;
    const options = {
      uri: `${config.omdbapi.host}/`,
      qs: {
        apikey: config.omdbapi.key,
        i: i,
        plot: plot,
      },
      resolveWithFullResponse: true
    };
    let result = await rp(options);
    result = result.toJSON();
    const model = await this.logModel
    model.create({
      URL: result.request.uri.href,
      Response: JSON.parse(result.body),
      Params: result.request.uri.path,
      TypeRequest: 'Detail'
    })
    return {
      status: result.statusCode,
      body: JSON.parse(result.body),
    }
  }
}
module.exports = MovieRepository;
