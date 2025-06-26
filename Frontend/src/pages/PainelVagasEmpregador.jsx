import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalNovaVaga from '../components/ModalNovaVaga';

function PainelVagas() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [vagas, setVagas] = useState([]);

  const empregadorId = 1; // coloque o ID real do empregador

  useEffect(() => {
    fetchVagas();
  }, []);

  const fetchVagas = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/${empregadorId}/vagas`);
      setVagas(response.data);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    }
  };

  const atualizarListaVagas = () => {
    fetchVagas();
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

      {vagas.length === 0 ? (
        <p>Nenhuma vaga encontrada.</p>
      ) : (
        vagas.map((vaga) => (
          <div key={vaga.id} className="vaga-item">
            <h3>{vaga.titulo}</h3>
            <p>{vaga.descricao}</p>
            {/* Aqui botões de editar e excluir, se quiser */}
          </div>
        ))
      )}
    </div>
  );
}

export default PainelVagas;
