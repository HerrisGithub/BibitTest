const express = require('express');
const bodyParser = require('body-parser');
const addRequestId = require('express-request-id');
const MovieController = require('./controller/MovieController');
const { requestResponseLogger, errorHandler } = require('./middlewares');
const { BusinessError, ErrorCode } = require('./error');
const config = require('../config');

class Application {
  /**
   * @constructor
   */
  constructor({ movieController }) {
    const app = express();
    // Add request id
    app.use(addRequestId());
    // Parse application/x-www-form-urlencoded requests
    app.use(bodyParser.urlencoded({ extended: true }));
    // Parse application/json requests
    app.use(bodyParser.json());
    // Log requests and responses
    app.use(requestResponseLogger);
    if (!(movieController instanceof MovieController)) {
      throw new TypeError('Invalid argument(s) type');
    }

    /**
     * API routers
     */
    app.get('/api/v1/search', wrapAsync(movieController.searchMovie()));
    app.get('/api/v1/detail/:id', wrapAsync(movieController.detailMovie()));

    // 404 not found error
    app.use((req, res) => {
      throw new BusinessError(ErrorCode.NotFoundUrl);
    });

    // Error handler
    app.use(errorHandler);

    this.app = app;
  }

  /**
   * 
   * @param {Number} port
   */
  start() {
    const { app } = this;
    const { log } = console;
    const { port } = config.server;
    if (!port) {
      throw new Error('Configuration error: can\'t fine server port in configuration');
    }
    app.listen(port, () => {
      log(`[Application] Server is running on port ${port}`);
    });
  }
}

/**
 * Async function wrapper to catch error in express api middleware
 * @param {Function} fn
 */
function wrapAsync(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}

module.exports = Application;
