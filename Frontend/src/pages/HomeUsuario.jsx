import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/HomeUsuario.css';
import ModalCurriculo from '../components/ModalCurriculo';
import Navbar from '../components/Navbar';

function HomeUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [totalVagas, setTotalVagas] = useState(0);
  const [ultimaMensagem, setUltimaMensagem] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);
  const [arquivo, setArquivo] = useState(null);
  const navigate = useNavigate();
  const idUsuario = 1; // simulado

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

  const abrirModal = () => setMostrarModal(true);
  const fecharModal = () => {
    setArquivo(null);
    setMostrarModal(false);
  };

  const enviarCurriculo = () => {
    if (!arquivo) {
      alert('Selecione um arquivo primeiro!');
      return;
    }
    alert(`Currículo "${arquivo.name}" enviado com sucesso!`);
    fecharModal();
  };

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

      <section className="home-actions">
        <h2>🔗 Acesso Rápido</h2>
        <div className="home-buttons">
          <button onClick={() => navigate('/painel')}>🔍 Ver Vagas</button>
          <button onClick={abrirModal}>📤 Enviar Currículo</button>
          <button onClick={() => navigate('/caixa-de-entrada')}>💬 Mensagens</button>
          <button onClick={() => navigate('/perfil')}>👤 Meu Perfil</button>
        </div>
      </section>

      <footer className="home-footer">
        <p>© {new Date().getFullYear()} Workplus • Todos os direitos reservados</p>
      </footer>

      <ModalCurriculo
        isOpen={mostrarModal}
        onClose={fecharModal}
        onUpload={enviarCurriculo}
        file={arquivo}
        setFile={setArquivo}
      />
    </div>
  );
}

export default HomeUsuario;
