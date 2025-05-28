import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/TelaLogin.css';

function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        localStorage.setItem('logado', 'true');
        alert('Login bem-sucedido!');
        navigate('/home');
      } else {
        alert('Email ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
          <button type="submit">Entrar</button>
        </form>

        {/* Seção de ações extras */}
        <div className="extra-actions">
          <h3>Ou acesse diretamente:</h3>
          <button onClick={() => navigate('/cadastro')}>Cadastre se</button>
          <button onClick={() => navigate('/painel')}>Ver Vagas</button>
          
        <button onClick={() => navigate('/curriculo')}>Enviar Currículo</button>
        </div>
      </div>
    </div>
  );
}

export default TelaLogin;
