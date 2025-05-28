const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');

router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const existe = await db.Usuario.findOne({ where: { email } });

    if (existe) {
      return res.status(400).json({ error: 'Usuário já existe.' });
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await db.Usuario.create({ email, senha: senhaCriptografada });
    res.json({ success: true });
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
  }
});

module.exports = router;

