const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Empregador } = require('../models');

router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const empregador = await Empregador.findOne({ where: { email } });
    if (!empregador) {
      return res.status(401).json({ error: 'Empregador não encontrado' });
    }

    const senhaConfere = await bcrypt.compare(senha, empregador.senha);
    if (!senhaConfere) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    return res.json({
      success: true,
      message: 'Login de empregador realizado com sucesso',
      tipo: 'empregador',
      id: empregador.id
    });
  } catch (error) {
    console.error('Erro no login do empregador:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;
