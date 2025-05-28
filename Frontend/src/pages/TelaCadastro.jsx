import React, { useState } from 'react';
import '../assets/css/TelaCadastro.css';
import axios from 'axios';

function TelaCadastro() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    cpf: '',
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
      await axios.post('http://localhost:3001/usuarios', form);
      alert('Cadastro realizado com sucesso!');
      setForm({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        cpf: '',
        telefone: '',
      });
    } catch (err) {
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h2>Crie sua conta no Workplus</h2>

        <input type="text" name="nome" placeholder="Nome completo" required value={form.nome} onChange={handleChange} />
        <input type="email" name="email" placeholder="E-mail" required value={form.email} onChange={handleChange} />
        <input type="password" name="senha" placeholder="Senha" required value={form.senha} onChange={handleChange} />
        <input type="password" name="confirmarSenha" placeholder="Confirmar senha" required value={form.confirmarSenha} onChange={handleChange} />
        <input type="text" name="cpf" placeholder="CPF" required value={form.cpf} onChange={handleChange} />
        <input type="text" name="telefone" placeholder="Telefone" required value={form.telefone} onChange={handleChange} />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default TelaCadastro;
