const express = require('express');
const router = express.Router();
const { Empregador, Vaga } = require('../models');

router.get('/:id/vagas', async (req, res) => {
  const { id } = req.params;
  try {
    const vagas = await Vaga.findAll({ where: { empregadorId: id } });
    res.json(vagas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vagas do empregador' });
  }
});

module.exports = router;
