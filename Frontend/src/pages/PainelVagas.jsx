import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../assets/css/PainelVagas.css';

function PainelVagas() {
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/vagas')
      .then(res => setVagas(res.data))
      .catch(() => alert('Erro ao carregar vagas.'));
  }, []);

  return (
    <div className="painel-container">
      <Navbar />
      <div className="painel-header">
        <h1>📌 Vagas Disponíveis</h1>
        <p>Confira as oportunidades abertas para você</p>
      </div>

      <div className="vagas-grid">
        {vagas.map((vaga) => (
          <div key={vaga.id} className="vaga-card">
            <h2>{vaga.titulo}</h2>
            <p><strong>Local:</strong> {vaga.local}</p>
            <p><strong>Área:</strong> {vaga.area}</p>
            <p><strong>Salário:</strong> {vaga.salario}</p>
            <p className="descricao">{vaga.descricao}</p>
            <button className="btn-candidatar">Candidatar-se</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PainelVagas;
