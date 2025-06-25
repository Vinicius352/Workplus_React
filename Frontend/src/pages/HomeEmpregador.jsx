import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/HomeEmpregador.css';

function HomeEmpregador() {
  const navigate = useNavigate();

  useEffect(() => {
    const logado = localStorage.getItem('logado') === 'true';
    const tipoUsuario = localStorage.getItem('tipoUsuario');

    if (!logado || tipoUsuario !== 'empregador') {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="home-empregador-container">
      <header className="home-empregador-header">
        <div className="info">
          <h1>Bem-vindo ao Painel do Empregador 👨‍💼</h1>
          <p>Gerencie suas vagas e acompanhe o processo seletivo.</p>
        </div>
      </header>

      <section className="home-empregador-content">
        <div className="card-box">
          <h3>📌 Vagas Publicadas</h3>
          <p className="number">2</p>
        </div>
        <div className="card-box">
          <h3>🧑‍💼 Candidatos</h3>
          <p className="number">12</p>
        </div>
        <div className="card-box">
          <h3>🗓️ Entrevistas</h3>
          <p className="number">3</p>
        </div>
        <div className="card-box">
          <h3>➕ Criar Vaga</h3>
          <p>Adicione uma nova vaga e comece a receber currículos.</p>
          <button onClick={() => navigate('/criar-vaga')}>Criar Vaga</button>
        </div>
        <div className="card-box">
          <h3>📂 Minhas Vagas</h3>
          <p>Gerencie as vagas cadastradas por você.</p>
          <button onClick={() => navigate('/minhas-vagas')}>Ver Vagas</button>
        </div>
        <div className="card-box">
          <h3>🧾 Candidatos</h3>
          <p>Avalie os perfis dos candidatos às suas vagas.</p>
          <button onClick={() => navigate('/candidatos')}>Ver Candidatos</button>
        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Workplus — Todos os direitos reservados
      </footer>
    </div>
  );
}

export default HomeEmpregador;
