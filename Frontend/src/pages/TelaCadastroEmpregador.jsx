// src/pages/TelaCadastroEmpregador.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/TelaCadastroEmpregador.css';

function TelaCadastroEmpregador() {
  const [form, setForm] = useState({
    nomeEmpresa: '',
    email: '',
    senha: '',
    cnpj: '',
    telefone: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await axios.post('http://localhost:3001/api/empregador', form);
      alert('✅ Cadastro de empregador enviado com sucesso!');
      setForm({
        nomeEmpresa: '',
        email: '',
        senha: '',
        cnpj: '',
        telefone: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar empregador:', error);
      alert('❌ Erro ao cadastrar: ' + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="empregador-container">
      <form className="empregador-form" onSubmit={handleSubmit}>
        <h2>Cadastro de Empregador</h2>
        <input name="nomeEmpresa" placeholder="Nome da Empresa" value={form.nomeEmpresa} onChange={handleChange} required />
        <input name="email" type="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
        <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} required />
        <input name="cnpj" placeholder="CNPJ" value={form.cnpj} onChange={handleChange} required />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TelaCadastroEmpregador;
