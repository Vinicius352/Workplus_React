const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importa os modelos
db.Usuario = require('./usuario')(sequelize, Sequelize);
db.Vaga = require('./vaga')(sequelize, Sequelize);

module.exports = db;
