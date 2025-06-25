const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Caminho para o banco SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// ✅ Importa os models
db.Usuario = require('./usuario')(sequelize, DataTypes);
db.Empregador = require('./empregador')(sequelize, DataTypes);
db.Vaga = require('./vaga')(sequelize, DataTypes); // Se tiver
// adicione outros models aqui

module.exports = db;

