const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Usuario } = require('../models');

router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaConfere = await bcrypt.compare(senha, usuario.senha);
    if (!senhaConfere) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Login OK
    res.json({ success: true, message: 'Login realizado com sucesso', usuario });
  } catch (error) {
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

module.exports = router;
