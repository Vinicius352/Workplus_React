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
 * PUT /usuarios/:id
 * Atualiza os dados do usuário
 */
router.put('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    const { nome, email, cpf, telefone } = req.body;

    usuario.nome = nome ?? usuario.nome;
    usuario.email = email ?? usuario.email;
    usuario.cpf = cpf ?? usuario.cpf;
    usuario.telefone = telefone ?? usuario.telefone;

    await usuario.save();

    res.json({ success: true, message: 'Perfil atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

/**
 * DELETE /usuarios/:id
 * Remove o usuário
 */
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuário não encontrado' });

    await usuario.destroy();
    res.json({ success: true, message: 'Conta excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir conta' });
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
 * GET /usuarios
 * Lista todos os usuários
 */
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['senha'] }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

module.exports = router;
