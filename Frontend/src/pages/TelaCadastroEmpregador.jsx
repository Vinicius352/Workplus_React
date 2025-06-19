// src/pages/TelaCadastroEmpregador.jsx
import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/TelaCadastroEmpregador.css';

function TelaCadastroEmpregador() {
  const [form, setForm] = useState({
    nomeEmpresa: '',
    cnpj: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.senha !== form.confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/empregadores', form);
      alert('✅ Empregador cadastrado com sucesso!');
      setForm({
        nomeEmpresa: '',
        cnpj: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        telefone: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar empregador:', error);
      alert('❌ Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="cadastro-empregador-container">
      <form className="cadastro-empregador-form" onSubmit={handleSubmit}>
        <h2>Cadastro de Empregador</h2>

        <input type="text" name="nomeEmpresa" placeholder="Nome da Empresa" required value={form.nomeEmpresa} onChange={handleChange} />
        <input type="text" name="cnpj" placeholder="CNPJ" required value={form.cnpj} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" required value={form.email} onChange={handleChange} />
        <input type="password" name="senha" placeholder="Senha" required value={form.senha} onChange={handleChange} />
        <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" required value={form.confirmarSenha} onChange={handleChange} />
        <input type="text" name="telefone" placeholder="Telefone" required value={form.telefone} onChange={handleChange} />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TelaCadastroEmpregador;
