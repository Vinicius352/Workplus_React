import React from 'react';

function Navbar() {
  const goHome = () => {
    alert('Ir para a tela inicial (simulado)');
  };

  const updateResume = () => {
    alert('Ir para atualização de currículo (simulado)');
  };

  return (
    <nav className="navbar">
      <button className="nav-btn" onClick={goHome}>Início</button>
      <button className="nav-btn" onClick={updateResume}>Atualize seu Currículo</button>
    </nav>
  );
}

export default Navbar;
