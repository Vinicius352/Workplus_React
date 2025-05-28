const express = require('express');
const bcrypt = require('bcrypt');
const multer = require('multer');
const { Usuario } = require('../models');
const router = express.Router();

// 📁 Configuração de upload com multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

/**
 * GET /usuarios/:id
 * Busca os dados de um usuário pelo ID
 */
router.get('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const { senha, ...dadosPublicos } = usuario.dataValues;
    res.json(dadosPublicos);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro no servidor' });
  }
});

/**
 * POST /usuarios/:id/curriculo
 * Atualiza o campo "curriculo" do usuário com o nome do arquivo enviado
 */
router.post('/usuarios/:id/curriculo', upload.single('curriculo'), async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    usuario.curriculo = req.file.filename;
    await usuario.save();

    res.json({ success: true, message: 'Currículo enviado', arquivo: req.file.filename });
  } catch (error) {
    console.error('Erro ao enviar currículo:', error);
    res.status(500).json({ error: 'Erro no envio do currículo' });
  }
});

/**
 * (Opcional) GET /usuarios
 * Lista todos os usuários
 */
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['senha'] } // evita enviar senhas
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

module.exports = router;

