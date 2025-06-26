import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Swal from 'sweetalert2';
import '../assets/css/PerfilUsuario.css';

function PerfilUsuario() {
  const [usuario, setUsuario] = useState(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    telefone: ''
  });

  const navigate = useNavigate();
  const idUsuario = localStorage.getItem('usuarioId');

  useEffect(() => {
    const logado = localStorage.getItem('logado') === 'true';
    if (!logado) navigate('/login');

    axios.get(`http://localhost:3001/api/usuario/usuarios/${idUsuario}`)
      .then(res => {
        setUsuario(res.data);
        setForm(res.data); // Preenche o formulário com os dados recebidos
      })
      .catch(() => alert('Erro ao carregar perfil'));
  }, [navigate, idUsuario]);

  const sair = () => {
    localStorage.removeItem('logado');
    localStorage.removeItem('usuarioId');
    navigate('/login');
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/usuario/usuarios/${idUsuario}`, form);
      setUsuario(form);
      setEditando(false);
      Swal.fire('✅ Sucesso!', 'Perfil atualizado com sucesso.', 'success');
    } catch (error) {
      Swal.fire('❌ Erro', 'Erro ao atualizar o perfil.', 'error');
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação vai excluir sua conta permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3001/api/usuario/usuarios/${idUsuario}`);
      localStorage.clear();
      Swal.fire('Conta excluída!', '', 'success');
      navigate('/login');
    } catch (error) {
      Swal.fire('❌ Erro', 'Erro ao excluir a conta.', 'error');
    }
  };

  return (
    <div className="perfil-container">
      <Navbar />
      <div className="perfil-card">
        <div className="perfil-header">
          <img src="https://i.pravatar.cc/150?img=13" alt="avatar" className="perfil-avatar" />
          <div>
            <h2>{usuario?.nome || 'Usuário'}</h2>
            <p className="perfil-subtitle">Informações da sua conta</p>
          </div>
        </div>

        {usuario ? (
          <div className="perfil-dados">
            <div className="perfil-linha">
              <label>📛 Nome:</label>
              {editando ? (
                <input value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
              ) : (
                <span>{usuario.nome}</span>
              )}
            </div>

            <div className="perfil-linha">
              <label>📧 E-mail:</label>
              {editando ? (
                <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
              ) : (
                <span>{usuario.email}</span>
              )}
            </div>

            <div className="perfil-linha">
              <label>🪪 CPF:</label>
              {editando ? (
                <input value={form.cpf} onChange={e => setForm({ ...form, cpf: e.target.value })} />
              ) : (
                <span>{usuario.cpf}</span>
              )}
            </div>

            <div className="perfil-linha">
              <label>📞 Telefone:</label>
              {editando ? (
                <input value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
              ) : (
                <span>{usuario.telefone}</span>
              )}
            </div>

            <div className="botoes">
              {editando ? (
                <>
                  <button onClick={handleSave}>💾 Salvar</button>
                  <button onClick={() => {
                    setEditando(false);
                    setForm(usuario); // Reseta os campos
                  }}>❌ Cancelar</button>
                </>
              ) : (
                <>
                  <button onClick={() => setEditando(true)}>✏️ Editar (Em Breve...)</button>
                  <button onClick={handleDelete}>🗑️ Excluir conta (Em Breve...)</button>
                  <button onClick={sair}>🚪 Sair</button>
                </>
              )}
            </div>
          </div>
        ) : (
          <p className="carregando">Carregando informações...</p>
        )}
      </div>
    </div>
  );
}

export default PerfilUsuario;
