const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Empregador } = require('../models');

// 📌 POST - Cadastro de empregador
router.post('/', async (req, res) => {
  const { nomeEmpresa, email, senha, cnpj, telefone } = req.body;

  try {
    // Verifica se já existe um empregador com o mesmo email
    const existe = await Empregador.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ error: 'Empregador já cadastrado com este email.' });
    }

    // Criptografa a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Cria novo empregador
    await Empregador.create({
      nomeEmpresa,
      email,
      senha: senhaCriptografada,
      cnpj,
      telefone
    });

    res.json({ success: true, message: 'Empregador cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar empregador:', error);
    res.status(500).json({ error: 'Erro no servidor ao cadastrar empregador.' });
  }
});

module.exports = router;
