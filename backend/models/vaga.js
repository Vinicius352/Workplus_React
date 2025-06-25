module.exports = (sequelize, DataTypes) => {
  const Vaga = sequelize.define('Vaga', {
    titulo: DataTypes.STRING,
    local: DataTypes.STRING,
    salario: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    categoria: DataTypes.STRING,
    area: DataTypes.STRING,
    empregadorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Vaga;
};
