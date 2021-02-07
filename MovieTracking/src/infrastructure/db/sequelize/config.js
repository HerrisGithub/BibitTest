const higherConfiguration = require('../../config');
const config = {
  username: higherConfiguration.db.user,
  password: higherConfiguration.db.password,
  database: higherConfiguration.db.database,
  host: higherConfiguration.db.host,
  port: higherConfiguration.db.port,
  dialect: 'mysql',
  define: {
    timestamps: false
  },
  logging: false
};

module.exports = config;
