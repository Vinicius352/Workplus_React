import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/TelaLogin.css';

function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3001/api/login', { email, senha });

      if (response.data.success) {
        const { tipo, id } = response.data;

        localStorage.setItem('logado', 'true');
        localStorage.setItem('tipoUsuario', tipo);
        if (tipo === 'empregador') {
          localStorage.setItem('empregadorId', id);
        } else {
          localStorage.setItem('usuarioId', id);
        }

        navigate(tipo === 'empregador' ? '/empregador/home' : '/home');
      } else {
        setErro('❌ Credenciais inválidas. Verifique seu e-mail e senha.');
      }
    } catch (error) {
      console.error('Erro ao logar:', error);
      setErro('❌ Erro ao realizar login. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Workplus - Login</h2>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Entrando...' : 'Entrar'}
        </button>

        {erro && <p className="erro-login">{erro}</p>}

        <div className="login-links">
          <p>Não tem conta?</p>
          <button type="button" onClick={() => navigate('/cadastro')} disabled={loading}>
            Sou Candidato
          </button>
          <button type="button" onClick={() => navigate('/cadastro-empregador')} disabled={loading}>
            Sou Empregador
          </button>
        </div>
      </form>
    </div>
  );
}

export default TelaLogin;
