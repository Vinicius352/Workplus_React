const express = require('express');
const cors = require('cors');
const db = require('./models');

const authRoutes = require('./routes/auth');
const cadastroRoutes = require('./routes/cadastro');
const vagasRoutes = require('./routes/vagas');
const usuarioRoutes = require('./routes/auth.js');
const usuariosRoutes = require('./routes/usuariosRoutes');
const empregadorRoutes = require('./routes/empregadorRoutes'); // 👈 ADICIONE ESTA LINHA

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
app.use('/api/empregador', empregadorRoutes); // 👈 REGISTRA A NOVA ROTA

// Popular dados iniciais
async function popularDadosIniciais() {
  const senhaHash = await bcrypt.hash('1234', 10);

  await db.Usuario.create({
    nome: 'Usuário Teste',
    email: 'teste@email.com',
    senha: senhaHash,
    cpf: '000.000.000-00',
    telefone: '(11) 99999-9999'
  });

  await db.Vaga.bulkCreate([
    {
      titulo: 'Dev Web',
      local: 'São Paulo, SP',
      salario: 'R$ 5.000,00',
      descricao: 'Conhecimento em HTML, CSS e JS.',
      categoria: 'recommended',
      area: 'Desenvolvimento'
    },
    {
      titulo: 'Analista de Marketing',
      local: 'Belo Horizonte, MG',
      salario: 'R$ 4.200,00',
      descricao: 'Campanhas de mídias sociais.',
      categoria: 'other',
      area: 'Marketing'
    }
  ]);

  console.log('✅ Usuário e vagas de teste inseridos.');
}

// Iniciar servidor
db.sequelize.sync({ force: true }).then(async () => {
  await popularDadosIniciais();

  app.listen(3001, () => {
    console.log('🚀 Servidor rodando em http://localhost:3001');
  });
});
