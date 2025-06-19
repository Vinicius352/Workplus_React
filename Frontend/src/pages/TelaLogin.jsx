import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/TelaLogin.css';

function TelaLogin() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [tipo, setTipo] = useState('candidato'); // novo estado
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const rota = tipo === 'empregador' ? 'empregador/login' : 'login';
      const resposta = await axios.post(`http://localhost:3001/api/${rota}`, form);

      if (resposta.data.success) {
        localStorage.setItem('logado', 'true');
        localStorage.setItem('tipo', tipo);
        localStorage.setItem(tipo === 'empregador' ? 'empregadorId' : 'usuarioId', resposta.data.usuario.id);

        alert('✅ Login realizado com sucesso!');
        navigate(tipo === 'empregador' ? '/painel-empregador' : '/home');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Erro ao fazer login.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login Workplus</h2>

        <div className="tipo-selector">
          <label>
            <input
              type="radio"
              value="candidato"
              checked={tipo === 'candidato'}
              onChange={() => setTipo('candidato')}
            />
            Sou Candidato
          </label>
          <label>
            <input
              type="radio"
              value="empregador"
              checked={tipo === 'empregador'}
              onChange={() => setTipo('empregador')}
            />
            Sou Empregador
          </label>
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          required
          value={form.senha}
          onChange={handleChange}
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default TelaLogin;
