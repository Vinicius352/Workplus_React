const express = require('express');
const cors = require('cors');
const db = require('./models');

const authRoutes = require('./routes/auth');
const cadastroRoutes = require('./routes/cadastro');
const vagasRoutes = require('./routes/vagas');
const usuarioRoutes = require('./routes/auth.js');
const usuariosRoutes = require('./routes/usuariosRoutes');
const empregadorRoutes = require('./routes/empregador'); // 👈 ADICIONE ESTA LINHA
const loginEmpregadorRoutes = require('./routes/loginEmpregador');


const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// ROTAS
app.use('/api/login', authRoutes);
app.use('/api/cadastro', cadastroRoutes);
app.use('/api/vagas', vagasRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/usuario', usuariosRoutes);
app.use('/api/empregador', empregadorRoutes);
app.use('/api/login/empregador', loginEmpregadorRoutes);




async function popularDadosIniciais() {
  const senhaHash = await bcrypt.hash('1234', 10);

  const usuario = await db.Usuario.create({
    nome: 'Usuário Teste',
    email: 'teste@email.com',
    senha: senhaHash,
    cpf: '000.000.000-00',
    telefone: '(11) 99999-9999'
  });

  const empregador = await db.Empregador.create({
    nomeEmpresa: 'Tech Solutions',
    email: 'empregador@email.com',
    senha: senhaHash,
    cnpj: '12.345.678/0001-99',
    telefone: '(11) 88888-8888'
  });

  await db.Vaga.bulkCreate([
    {
      titulo: 'Dev Web',
      local: 'São Paulo, SP',
      salario: 'R$ 5.000,00',
      descricao: 'Conhecimento em HTML, CSS e JS.',
      categoria: 'recommended',
      area: 'Desenvolvimento',
      empregadorId: empregador.id  // 👈 associando o empregador
    },
    {
      titulo: 'Analista de Marketing',
      local: 'Belo Horizonte, MG',
      salario: 'R$ 4.200,00',
      descricao: 'Campanhas de mídias sociais.',
      categoria: 'other',
      area: 'Marketing',
      empregadorId: empregador.id  // 👈 associando o empregador
    }
  ]);

  console.log('✅ Usuário, empregador e vagas de teste inseridos.');
}


// Iniciar servidor
db.sequelize.sync({ force: true }).then(async () => {
  await popularDadosIniciais();

  app.listen(3001, () => {
    console.log('🚀 Servidor rodando em http://localhost:3001');
  });
});
