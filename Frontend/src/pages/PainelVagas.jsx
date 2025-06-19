import React, { useState } from 'react';
import ModalNovaVaga from '../components/ModalNovaVaga';

function PainelVagas() {
  const [mostrarModal, setMostrarModal] = useState(false);

  const atualizarListaVagas = () => {
    // lógica para atualizar as vagas no painel
  };

  return (
    <div className="painel-container">
      <h1>Painel de Vagas</h1>
      <button onClick={() => setMostrarModal(true)}>+ Nova Vaga</button>

      {mostrarModal && (
        <ModalNovaVaga
          onClose={() => setMostrarModal(false)}
          onVagaCriada={atualizarListaVagas}
        />
      )}

      {/* aqui vem sua lista de vagas */}
    </div>
  );
}

export default PainelVagas;
