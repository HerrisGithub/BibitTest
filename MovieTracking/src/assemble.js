const db = require('./infrastructure/db/pure');
const modelIndex = require('./infrastructure/db/sequelize/models/index');
const MovieRepository = require('./adapter/db/pure/MovieRepository');
const MovieService = require('./usecase/MovieService');
const MovieController = require('./infrastructure/server/controller/MovieController');


const Application = require('./infrastructure/server/Application');
const Log = require('./infrastructure/db/sequelize/models/Log');

const { log, error } = console;

/**
 * Assemble server application components
 * @returns {Application}
 */
const assemble = () => {
  const movieRepository = new MovieRepository(db, Log.init(modelIndex.sequelize));
  const movieService = new MovieService({ movieRepository });
  const movieController = new MovieController({ movieService });
  // Setup server application
  const application = new Application({ movieController });
  return application;
};


// Connect database
db.init()
  .then(() => { // If database connection success,
    log('[Container] Database is connected');
    // Assemble components to setup server application
    const application = assemble();
    // Start server
    application.start();
  })
  .catch((err) => { // If database connection failed
    error('[Container] Database connection is failed');
    error(err);
    process.exit(1);
  });

module.exports = assemble;
