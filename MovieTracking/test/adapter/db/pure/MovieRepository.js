const { describe, it, before } = require('mocha');
const db = require('../../../../src/infrastructure/db/pure');
const MovieRepository = require('../../../../src/adapter/db/pure/MovieRepository');
const SearchMovie = require('../../../../src/domain/SearchMovie');
const DetailMovie = require('../../../../src/domain/DetailMovie');
const Log = require('../../../../src/infrastructure/db/sequelize/models/Log');
const modelIndex = require('../../../../src/infrastructure/db/sequelize/models/index');
describe('Movie repository test', () => {
  const movieRepository = new MovieRepository(db, Log.init(modelIndex.sequelize));
  before(async () => {
    await db.init();
  });

  it('Search Movie Test', (done) => {
    const searchMovie = new SearchMovie('Batman', 1);
    movieRepository.searchMovie(searchMovie)
      .then(() => done())
      .catch((err) => done(err));
  });
  it('Search Detail Movie Test', (done) => {
    const detail = new DetailMovie('tt2409658', 'short');
    movieRepository.detailMovie(detail)
      .then(() => done())
      .catch((err) => done(err));
  });
});
