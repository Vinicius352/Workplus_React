import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../assets/css/HomeUsuario.css';

function HomeUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [totalVagas, setTotalVagas] = useState(0);
  const [ultimaMensagem, setUltimaMensagem] = useState('');
  const navigate = useNavigate();
  const idUsuario = 1;

  useEffect(() => {
    const logado = localStorage.getItem('logado') === 'true';
    if (!logado) navigate('/login');

    axios.get(`http://localhost:3001/api/usuario/usuarios/${idUsuario}`)
      .then(res => setUsuario(res.data))
      .catch(() => alert('Erro ao buscar usuário'));

    axios.get(`http://localhost:3001/api/vagas`)
      .then(res => setTotalVagas(res.data.length))
      .catch(() => setTotalVagas(0));

    setUltimaMensagem('Olá! Temos novas vagas para você 😉');
  }, [navigate]);

  return (
    <div className="home-usuario-wrapper">
      <Navbar />

      <header className="home-header">
        <div className="home-user-info">
          <img src="https://i.pravatar.cc/150?img=12" alt="avatar" className="home-avatar" />
          <div>
            <h1>Bem-vindo, {usuario?.nome || 'Usuário'} 👋</h1>
            <p>Explore novas oportunidades e atualize seu perfil.</p>
          </div>
        </div>
      </header>

      <section className="home-stats">
        <div className="home-card">
          <h3>📬 Última Mensagem</h3>
          <p>{ultimaMensagem}</p>
        </div>
        <div className="home-card">
          <h3>📄 Currículo</h3>
          <p>{usuario?.curriculo ? 'Enviado' : 'Não enviado'}</p>
        </div>
        <div className="home-card">
          <h3>📌 Vagas Abertas</h3>
          <p>{totalVagas}</p>
        </div>
      </section>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Workplus • Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default HomeUsuario;