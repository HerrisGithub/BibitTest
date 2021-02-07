const expressPinoLogger = require('express-pino-logger');
const { Router } = require('express');
const Pino = require('pino');

const { log } = console;

let logLevel = 'debug';
if (process.env.NODE_TEST === 'true') {
  log('[Server] Testing flag is set');
  logLevel = 'silent';
}

const pino = Pino({
  level: logLevel,
  prettyPrint: true,
});

const requestResponseLogger = Router();

requestResponseLogger.use(expressPinoLogger({
  logger: pino,
  serializers: {
    req: function requestSerializer(req) {
      return {
        id: req.id,
        method: req.method,
        url: req.url,
        headers: req.headers,
        remoteAddress: req.remoteAddress,
        remotePort: req.remotePort,
        body: req.raw.body,
      };
    },
  },
}));

module.exports = requestResponseLogger;
