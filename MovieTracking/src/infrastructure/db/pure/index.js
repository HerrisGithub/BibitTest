const DB = require('./DB');
const config = require('../../config');

const dbconfig = config.db;

// Check whether database configuration exists
if (!dbconfig) {
  throw new Error('Configuration error: can\'t find database configuration');
}

// Create database interface with configuration
const db = new DB(dbconfig);

module.exports = db;
