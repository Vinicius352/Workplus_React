import React, { useState } from 'react';
import '../assets/css/ModalNovaVaga.css';
import axios from 'axios';

function ModalNovaVaga({ onClose, onVagaCriada }) {
  const [vaga, setVaga] = useState({
    titulo: '',
    local: '',
    salario: '',
    descricao: '',
    categoria: '',
    area: ''
  });

  const handleChange = (e) => {
    setVaga({ ...vaga, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/vagas', vaga);
      alert('✅ Vaga cadastrada com sucesso!');
      onVagaCriada();
      onClose();
    } catch (error) {
      console.error('Erro ao cadastrar vaga:', error);
      alert('❌ Erro ao cadastrar vaga.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>📄 Nova Vaga</h2>
        <form onSubmit={handleSubmit}>
          <input name="titulo" placeholder="Título da vaga" required onChange={handleChange} />
          <input name="local" placeholder="Local" required onChange={handleChange} />
          <input name="salario" placeholder="Salário" required onChange={handleChange} />
          <input name="descricao" placeholder="Descrição" required onChange={handleChange} />
          <input name="categoria" placeholder="Categoria" required onChange={handleChange} />
          <input name="area" placeholder="Área" required onChange={handleChange} />
          <button type="submit">Cadastrar</button>
        </form>
        <button className="fechar-btn" onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}

export default ModalNovaVaga;
