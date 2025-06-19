module.exports = (sequelize, DataTypes) => {
  const Vaga = sequelize.define('Vaga', {
    titulo: DataTypes.STRING,
    local: DataTypes.STRING,
    salario: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    categoria: DataTypes.STRING,
    area: DataTypes.STRING,
    empregadorId: DataTypes.INTEGER // vínculo com o empregador
  });

  Vaga.associate = (models) => {
    Vaga.belongsTo(models.Empregador, { foreignKey: 'empregadorId' });
  };

  return Vaga;
};
