// src/components/Navbar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const sair = () => {
    localStorage.removeItem('logado');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <button className="nav-btn" onClick={() => navigate('/home')}>🏠 Início</button>
        <button className="nav-btn" onClick={() => navigate('/curriculo')}>📤 Currículo</button>
        <button className="nav-btn" onClick={() => navigate('/painel')}>🔍 Vagas</button>
        <button className="nav-btn" onClick={() => navigate('/caixa-de-entrada')}>💬 Mensagens</button>
      </div>
      <div className="nav-right">
        <button className="nav-btn" onClick={() => navigate('/perfil')}>👤 Perfil</button>
        <button className="nav-btn sair" onClick={sair}>🚪 Sair</button>
      </div>
    </nav>
  );
}

export default Navbar;
