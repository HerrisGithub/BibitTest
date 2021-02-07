const { sequelize } = require('./models');

const { log, error } = console;

const init = async () => {
  sequelize.sync()
    .then(() => {
      log('DB initialization finished');
    })
    .catch((err) => {
      error('DB initialization failed');
      error(err);
    });
};

module.exports = {
  init,
};
