module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    cpf: DataTypes.STRING,
    telefone: DataTypes.STRING,
    curriculo: DataTypes.STRING, // novo campo para armazenar o nome do arquivo
  });

  return Usuario;
};
