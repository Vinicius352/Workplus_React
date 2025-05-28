import React from 'react';

function VagasList({ onCategoriaClick }) {
  return (
    <aside className="job-list">
      <h2>Categorias</h2>
      <ul>
        <li onClick={() => onCategoriaClick('recommended')}>Vagas Recomendadas</li>
        <li onClick={() => onCategoriaClick('other')}>Outras Vagas</li>
      </ul>
    </aside>
  );
}

export default VagasList;
