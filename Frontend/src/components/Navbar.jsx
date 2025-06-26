import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/Navbar.css';

function Navbar() {
  const navigate = useNavigate();

  const handleVoltar = () => {
    window.history.back();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">Workplus</h1>
      </div>
      <div className="navbar-right">
        <button onClick={handleVoltar} className="nav-button">🔙 Voltar</button>
        <button onClick={() => navigate('/home')} className="nav-button">🏠 Início</button>
        <button onClick={() => navigate('/curriculo')} className="nav-button highlight">📄 Atualize Currículo</button>
        <button onClick={handleLogout} className="nav-button logout">🚪 Sair</button>
      </div>
    </nav>
  );
}

export default Navbar;
