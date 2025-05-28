const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/', async (req, res) => {
  const vagas = await db.Vaga.findAll();
  res.json(vagas);
});

module.exports = router;
