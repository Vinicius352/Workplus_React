import React from 'react';
import '../assets/css/ModalTipoUsuario.css';

function ModalTipoUsuario({ tipo, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{tipo === 'empregador' ? 'Bem-vindo, Empregador!' : 'Bem-vindo, Candidato!'}</h2>
        {tipo === 'empregador' ? (
          <>
            <p>Gerencie suas vagas e encontre os candidatos ideais.</p>
            <ul>
              <li>📂 Minhas Vagas</li>
              <li>➕ Criar Nova Vaga</li>
              <li>👤 Visualizar candidatos</li>
            </ul>
          </>
        ) : (
          <>
            <p>Busque vagas e envie seu currículo para participar dos processos seletivos.</p>
            <ul>
              <li>🔍 Buscar Vagas</li>
              <li>📤 Enviar Currículo</li>
              <li>👤 Editar Perfil</li>
            </ul>
          </>
        )}
        <button onClick={onClose}>Ir para o painel</button>
      </div>
    </div>
  );
}

export default ModalTipoUsuario;
