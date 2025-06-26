import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/css/TelaCurriculo.css';

function TelaCurriculo() {
  const [file, setFile] = useState(null);
  const [curriculoEnviado, setCurriculoEnviado] = useState('');
  const navigate = useNavigate();

  const idUsuario = localStorage.getItem('usuarioId'); // Pega o ID salvo no login

  useEffect(() => {
    const estaLogado = localStorage.getItem('logado') === 'true';
    if (!estaLogado) {
      Swal.fire({
        icon: 'warning',
        title: 'Acesso negado',
        text: 'Você precisa estar logado para enviar o currículo',
      }).then(() => navigate('/login'));
    }

    axios.get(`http://localhost:3001/api/usuario/usuarios/${idUsuario}`)
      .then(res => {
        if (res.data.curriculo) {
          setCurriculoEnviado(res.data.curriculo);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao carregar dados',
          text: 'Não foi possível buscar os dados do currículo.',
        });
      });
  }, [navigate, idUsuario]);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      Swal.fire({
        icon: 'info',
        title: 'Selecione um arquivo',
        text: 'Você precisa escolher um arquivo antes de enviar.',
      });
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
      Swal.fire({
        icon: 'success',
        title: 'Currículo enviado com sucesso!',
        showConfirmButton: false,
        timer: 2000
      });
      setFile(null);
    } catch (error) {
      console.error('Erro ao enviar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Erro ao enviar currículo',
        text: 'Tente novamente mais tarde.',
      });
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
