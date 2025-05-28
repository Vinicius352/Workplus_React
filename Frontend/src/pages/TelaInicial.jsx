import React from 'react';
import '../assets/css//TelaInicial.css';

function TelaInicial() {
  return (
    <div className="tela-inicial-container">
      <header className="header">
        <h1>Workplus</h1>
        <nav>
          <a href="/login" className="btn">Entrar</a>
          <a href="/cadastro" className="btn btn-secondary">Cadastrar</a>
        </nav>
      </header>

      <main className="main-content">
        <div className="text-section">
          <h2>Bem-vindo ao Workplus</h2>
          <p>Encontre vagas, envie currículos e conecte-se com empresas que buscam talentos.</p>
          <a href="/painel" className="btn btn-primary">Ver vagas</a>
        </div>
        <div className="image-section">
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80" alt="Emprego" />
        </div>
      </main>

      <footer className="footer">
        <p>© 2025 Workplus. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default TelaInicial;
