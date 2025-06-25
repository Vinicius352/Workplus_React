module.exports = (sequelize, DataTypes) => {
  const Empregador = sequelize.define('Empregador', {
    nomeEmpresa: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    telefone: {
      type: DataTypes.STRING
    }
  });

  return Empregador;
};
