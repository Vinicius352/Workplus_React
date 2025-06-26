import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../assets/css/PainelVagasUsuario.css';

function PainelVagasUsuario() {
  const [vagas, setVagas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const logado = localStorage.getItem('logado') === 'true';
    if (!logado) {
      alert('Você precisa estar logado para acessar as vagas.');
      navigate('/login');
      return;
    }

    axios.get('http://localhost:3001/api/vagas')
      .then(res => setVagas(res.data))
      .catch(() => alert('Erro ao buscar vagas'));
  }, [navigate]);

  const handleCandidatar = (vagaId) => {
    alert(`Candidatado com sucesso na vaga ${vagaId} ✅`);
    // Aqui você pode futuramente enviar para um endpoint de candidatura
  };

  return (
    <div className="painel-vagas-container">
      <h2>🔍 Vagas Disponíveis</h2>
      {vagas.length === 0 ? (
        <p>Nenhuma vaga encontrada no momento.</p>
      ) : (
        vagas.map(vaga => (
          <div className="vaga-card" key={vaga.id}>
            <h3>{vaga.titulo}</h3>
            <p><strong>Local:</strong> {vaga.local}</p>
            <p><strong>Salário:</strong> {vaga.salario}</p>
            <p><strong>Categoria:</strong> {vaga.categoria}</p>
            <p><strong>Área:</strong> {vaga.area}</p>
            <p>{vaga.descricao}</p>
            <button onClick={() => handleCandidatar(vaga.id)}>Candidatar-se</button>
          </div>
        ))
      )}
    </div>
  );
}

export default PainelVagasUsuario;