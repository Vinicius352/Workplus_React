import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/TelaEmpregador.css';

function TelaEmpregador() {
  const [empregadorId] = useState(1); // Simulado
  const [vagas, setVagas] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/empregador/${empregadorId}/vagas`)
      .then(res => setVagas(res.data))
      .catch(() => alert('Erro ao carregar vagas do empregador.'));
  }, [empregadorId]);

  return (
    <div className="empregador-container">
      <h1>📋 Painel do Empregador</h1>

      <div className="vagas-lista">
        {vagas.length === 0 ? (
          <p>Você ainda não cadastrou nenhuma vaga.</p>
        ) : (
          vagas.map(vaga => (
            <div key={vaga.id} className="vaga-item">
              <h3>{vaga.titulo}</h3>
              <p><strong>Local:</strong> {vaga.local}</p>
              <p><strong>Salário:</strong> {vaga.salario}</p>
              <p><strong>Descrição:</strong> {vaga.descricao}</p>
            </div>
          ))
        )}
      </div>

      <button className="nova-vaga-btn">➕ Nova Vaga</button>
    </div>
  );
}

export default TelaEmpregador;
