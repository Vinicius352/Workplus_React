const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'),
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.Usuario = require('./usuario')(sequelize, DataTypes);
db.Empregador = require('./empregador')(sequelize, DataTypes);
db.Vaga = require('./vaga')(sequelize, DataTypes);

module.exports = db;

