import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/css/TelaCurriculo.css';

function TelaCurriculo() {
  const [file, setFile] = useState(null);
  const [curriculoEnviado, setCurriculoEnviado] = useState('');
  const navigate = useNavigate();

  const idUsuario = 1; // Simulação - substitua depois pelo ID real do usuário logado

  useEffect(() => {
    const estaLogado = localStorage.getItem('logado') === 'true';
    if (!estaLogado) {
      alert('Você precisa estar logado para enviar o currículo.');
      navigate('/login');
    }

    // Busca o currículo já salvo (se existir)
    axios.get(`http://localhost:3001/api/usuario/usuarios/${idUsuario}`)
      .then(res => {
        if (res.data.curriculo) {
          setCurriculoEnviado(res.data.curriculo);
        }
      })
      .catch(err => {
        console.error('Erro ao buscar usuário:', err);
      });
  }, [navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('❌ Por favor, selecione um arquivo.');
      return;
    }

    const formData = new FormData();
    formData.append('curriculo', file);

    try {
      const res = await axios.post(
        `http://localhost:3001/api/usuario/usuarios/${idUsuario}/curriculo`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setCurriculoEnviado(res.data.arquivo);
      alert('✅ Currículo enviado com sucesso!');
      setFile(null);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      alert('❌ Erro ao enviar o currículo.');
    }
  };

  return (
    <div className="curriculo-container">
      <div className="curriculo-box">
        <h2>📄 Enviar Currículo</h2>
        <p>Selecione um arquivo PDF, DOC ou DOCX:</p>

        <form onSubmit={handleUpload}>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button type="submit">Enviar</button>
        </form>

        {curriculoEnviado && (
          <div className="file-preview">
            <p>📁 Enviado: <strong>{curriculoEnviado}</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TelaCurriculo;
