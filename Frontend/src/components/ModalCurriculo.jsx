import React from 'react';
import '../assets/css/ModalCurriculo.css';

function ModalCurriculo({ isOpen, onClose, onUpload, file, setFile }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>📄 Enviar Currículo</h2>
        <p>Escolha um arquivo PDF, DOC ou DOCX.</p>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="modal-buttons">
          <button onClick={onUpload} className="btn-confirmar">Enviar</button>
          <button onClick={onClose} className="btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalCurriculo;
