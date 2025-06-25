import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/TelaLogin.css';

function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, senha });

      if (response.data.success) {
        localStorage.setItem('logado', 'true');
        localStorage.setItem('tipoUsuario', response.data.tipo); // 'usuario' ou 'empregador'
        localStorage.setItem(
          response.data.tipo === 'usuario' ? 'usuarioId' : 'empregadorId',
          response.data.id
        );

        if (response.data.tipo === 'usuario') {
          navigate('/home');
        } else {
          navigate('/empregador/home');
        }
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      alert('Erro ao realizar login');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>

        <div className="login-links">
          <p>Não tem conta?</p>
          <button type="button" onClick={() => navigate('/cadastro')}>Sou Candidato</button>
          <button type="button" onClick={() => navigate('/cadastro-empregador')}>Sou Empregador</button>
        </div>
      </form>
    </div>
  );
}

export default TelaLogin;
