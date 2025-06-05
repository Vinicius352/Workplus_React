import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../assets/css/PerfilUsuario.css';

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const navigate = useNavigate();
  const idUsuario = 1; // Simulação

  useEffect(() => {
    const logado = localStorage.getItem('logado') === 'true';
    if (!logado) navigate('/login');

    axios.get(`http://localhost:3001/api/usuario/usuarios/${idUsuario}`)
      .then(res => setUsuario(res.data))
      .catch(() => alert('Erro ao carregar perfil'));
  }, [navigate]);

  const sair = () => {
    localStorage.removeItem('logado');
    navigate('/login');
  };

  return (
    <div className="perfil-container">
      <Navbar />
      <div className="perfil-card">
        <div className="perfil-header">
          <img src="https://i.pravatar.cc/150?img=13" alt="avatar" className="perfil-avatar" />
          <div>
            <h2>{usuario?.nome || 'Usuário'}</h2>
            <p className="perfil-subtitle">Informações da sua conta</p>
          </div>
        </div>

        {usuario ? (
          <div className="perfil-dados">
            <div className="perfil-linha">
              <label>📧 E-mail:</label>
              <span>{usuario.email}</span>
            </div>
            <div className="perfil-linha">
              <label>🪪 CPF:</label>
              <span>{usuario.cpf}</span>
            </div>
            <div className="perfil-linha">
              <label>📞 Telefone:</label>
              <span>{usuario.telefone}</span>
            </div>
            <button className="btn-sair" onClick={sair}>🚪 Sair</button>
          </div>
        ) : (
          <p className="carregando">Carregando informações...</p>
        )}
      </div>
    </div>
  );
}

export default PerfilUsuario;
