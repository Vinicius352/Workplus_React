import React from 'react';

function VagaCard({ vaga }) {
  return (
    <div className="job-card">
      <h2>{vaga.titulo}</h2>
      <p><strong>Local:</strong> {vaga.local}</p>
      <p><strong>Salário:</strong> {vaga.salario}</p>
      <p>{vaga.descricao}</p>
      <button className="apply-btn" onClick={() => alert('Candidatado!')}>Candidatar</button>
    </div>
  );
}

export default VagaCard;
