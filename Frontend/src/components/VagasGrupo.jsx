import React from 'react';
import VagaCard from './VagaCard.jsx';

function VagasGrupo({ categoria, dados }) {
  const grupos = dados[categoria] || [];

  return (
    <section className="job-details">
      {grupos.map((grupo, index) => (
        <div key={index} className="sub-category">
          <h4>{grupo.area}</h4>
          {grupo.vagas.map((vaga, i) => (
            <VagaCard key={i} vaga={vaga} />
          ))}
        </div>
      ))}
    </section>
  );
}

export default VagasGrupo;

