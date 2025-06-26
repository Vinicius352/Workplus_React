import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
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
      const res = await axios.post('http://localhost:3001/api/empregador', form);

      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Cadastro realizado!',
          text: 'Empregador cadastrado com sucesso.',
          showConfirmButton: false,
          timer: 2000
        });

        setForm({
          nomeEmpresa: '',
          email: '',
          senha: '',
          cnpj: '',
          telefone: '',
        });
      }
    } catch (err) {
      console.error('Erro ao cadastrar empregador:', err);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao cadastrar',
        text: err.response?.data?.error || 'Erro desconhecido. Tente novamente.',
      });
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
