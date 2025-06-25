import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/CriarVaga.css';

function CriarVaga() {
  const [form, setForm] = useState({
    titulo: '',
    local: '',
    salario: '',
    descricao: '',
    categoria: '',
    area: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const empregadorId = localStorage.getItem('empregadorId');
    if (!empregadorId) {
      alert('⚠️ Empregador não identificado. Faça login novamente.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/vagas', {
        ...form,
        empregadorId: parseInt(empregadorId)
      });

      alert('✅ Vaga criada com sucesso!');
      setForm({
        titulo: '',
        local: '',
        salario: '',
        descricao: '',
        categoria: '',
        area: ''
      });
    } catch (err) {
      console.error('Erro ao criar vaga:', err);
      alert('❌ Erro ao criar vaga.');
    }
  };

  return (
    <div className="criar-vaga-container">
      <form onSubmit={handleSubmit} className="criar-vaga-form">
        <h2>📌 Criar Nova Vaga</h2>
        <input name="titulo" placeholder="Título da vaga" value={form.titulo} onChange={handleChange} required />
        <input name="local" placeholder="Local de trabalho" value={form.local} onChange={handleChange} required />
        <input name="salario" placeholder="Salário" value={form.salario} onChange={handleChange} required />
        <input name="area" placeholder="Área de atuação" value={form.area} onChange={handleChange} required />
        <input name="categoria" placeholder="Categoria (recommended/other)" value={form.categoria} onChange={handleChange} required />
        <textarea name="descricao" placeholder="Descrição da vaga" value={form.descricao} onChange={handleChange} required />
        <button type="submit">Cadastrar Vaga</button>
      </form>
    </div>
  );
}

export default CriarVaga;
