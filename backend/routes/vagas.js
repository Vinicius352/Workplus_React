const express = require('express');
const router = express.Router();
const { Vaga } = require('../models');

// 📌 Criar nova vaga
router.post('/', async (req, res) => {
  const { titulo, local, salario, descricao, categoria, area, empregadorId } = req.body;

  try {
    const novaVaga = await Vaga.create({
      titulo,
      local,
      salario,
      descricao,
      categoria,
      area,
      empregadorId, // 👈 importante
    });

    res.status(201).json(novaVaga);
  } catch (error) {
    console.error('Erro ao criar vaga:', error);
    res.status(500).json({ error: 'Erro ao criar vaga' });
  }
});

// 🔍 Buscar vagas de um empregador específico
router.get('/empregador/:id', async (req, res) => {
  try {
    const vagas = await Vaga.findAll({
      where: { empregadorId: req.params.id }
    });
    res.json(vagas);
  } catch (error) {
    console.error('Erro ao buscar vagas:', error);
    res.status(500).json({ error: 'Erro ao buscar vagas' });
  }
});

// 📝 Atualizar uma vaga
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, local, salario, descricao, categoria, area } = req.body;

  try {
    const vaga = await Vaga.findByPk(id);
    if (!vaga) return res.status(404).json({ error: 'Vaga não encontrada' });

    await vaga.update({ titulo, local, salario, descricao, categoria, area });
    res.json({ success: true, message: 'Vaga atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar vaga:', error);
    res.status(500).json({ error: 'Erro ao atualizar vaga' });
  }
});

// ❌ Deletar vaga
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vaga = await Vaga.findByPk(id);
    if (!vaga) return res.status(404).json({ error: 'Vaga não encontrada' });

    await vaga.destroy();
    res.json({ success: true, message: 'Vaga excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir vaga:', error);
    res.status(500).json({ error: 'Erro ao excluir vaga' });
  }
});

module.exports = router;
