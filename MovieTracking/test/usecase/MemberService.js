const { describe, it, before } = require('mocha');
const db = require('../../src/infrastructure/db/pure');
const MovieRepository = require('../../src/adapter/db/pure/MovieRepository');
const MovieService = require('../../src/usecase/MovieService');
const Log = require('../../src/infrastructure/db/sequelize/models/Log');
const modelIndex = require('../../src/infrastructure/db/sequelize/models/index');
describe('Movie usecase test', () => {
  const movieRepository = new MovieRepository(db, Log.init(modelIndex.sequelize));
  const movieService = new MovieService({ movieRepository });
  before(async () => {
    await db.init();
  });
  it('Search movie should be success', (done) => {
    movieService.SearchMovie('Batman', 1)
      .then(() => done())
      .catch((err) => done(err));
  });
  it('Search detail movie should be success', (done) => {
    movieService.DetailMovie('tt2409658', 'short')
      .then(() => done())
      .catch((err) => done(err));
  });
});
