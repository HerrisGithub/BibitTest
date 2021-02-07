const configs = {
  // production: {
  //   db: { // Database configuration
  //     host: process.env.POSTGRESQL_HOST,
  //     port: process.env.POSTGRESQL_PORT,
  //     user: process.env.POSTGRESQL_USERNAME,
  //     password: process.env.POSTGRESQL_PASSWORD,
  //     database: 'movie',
  //   },
  //   server: { // Server configuration
  //     port: 3000,
  //   },
  // },
  development: {
    db: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'movie',
    },
    server: {
      port: 3000,
    }
  },
  production: {
    db: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '',
      database: 'movie',
    },
    server: {
      port: 3000,
    },
  },
 

};
let env = process.env.NODE_ENV;
if (env !== 'development' && env !== 'test' && env !== 'production') {
  env = 'development';
}
// Select configuration based on NODE_ENV
const config = configs[env];
// console.log(configs[env])
// Print configuration
const { log } = console;
// log(JSON.stringify(config, null, 4));
module.exports = config;
