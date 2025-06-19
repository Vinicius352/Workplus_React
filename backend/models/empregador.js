module.exports = (sequelize, DataTypes) => {
  const Empregador = sequelize.define('Empregador', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
  });

  Empregador.associate = (models) => {
    Empregador.hasMany(models.Vaga, { foreignKey: 'empregadorId' });
  };

  return Empregador;
};
