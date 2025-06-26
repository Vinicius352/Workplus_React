const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Usuario, Empregador } = require('../models');

router.post('/', async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (usuario) {
      const senhaConfere = await bcrypt.compare(senha, usuario.senha);
      if (!senhaConfere) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
      return res.json({
        success: true,
        message: 'Login realizado com sucesso',
        tipo: 'usuario',
        id: usuario.id
      });
    }

    const empregador = await Empregador.findOne({ where: { email } });

    if (empregador) {
      const senhaConfere = await bcrypt.compare(senha, empregador.senha);
      if (!senhaConfere) {
        return res.status(401).json({ error: 'Senha incorreta' });
      }
      return res.json({
        success: true,
        message: 'Login realizado com sucesso',
        tipo: 'empregador',
        id: empregador.id
      });
    }

    return res.status(401).json({ error: 'Usuário ou empregador não encontrado' });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro no servidor ao realizar login' });
  }
});


module.exports = router;
