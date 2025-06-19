// routes/empregador.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Empregador } = require('../models');

router.post('/', async (req, res) => {
  const { nomeEmpresa, cnpj, email, senha, telefone } = req.body;

  try {
    // Verifica se já existe o CNPJ ou email
    const existente = await Empregador.findOne({ where: { email } });
    if (existente) {
      return res.status(400).json({ error: 'Empregador já cadastrado com esse email.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const novoEmpregador = await Empregador.create({
      nomeEmpresa,
      cnpj,
      email,
      senha: senhaHash,
      telefone
    });

    res.status(201).json({ success: true, empregador: novoEmpregador });
  } catch (err) {
    console.error('Erro ao cadastrar empregador:', err);
    res.status(500).json({ error: 'Erro no servidor ao cadastrar.' });
  }
});

module.exports = router;
