import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../assets/css/MinhasVagasEmpregador.css';

function MinhasVagasEmpregador() {
  const [vagas, setVagas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({
    titulo: '',
    local: '',
    salario: '',
    descricao: '',
    categoria: '',
    area: ''
  });

  const empregadorId = 1;

  useEffect(() => {
    axios.get(`http://localhost:3001/api/vagas/empregador/${empregadorId}`)
      .then(res => setVagas(res.data))
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Erro ao buscar vagas',
          text: 'Tente novamente mais tarde.',
        });
      });
  }, [empregadorId]);

  const handleDelete = async (id) => {
    const confirmacao = await Swal.fire({
      title: 'Tem certeza?',
      text: 'Você deseja excluir esta vaga?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
    });

    if (!confirmacao.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3001/api/vagas/${id}`);
      setVagas(vagas.filter(v => v.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Vaga excluída com sucesso',
        timer: 2000,
        showConfirmButton: false
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao excluir vaga',
        text: 'Tente novamente.',
      });
    }
  };

  const handleEdit = (vaga) => {
    setEditando(vaga.id);
    setForm(vaga);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/vagas/${editando}`, form);
      setVagas(vagas.map(v => v.id === editando ? { ...v, ...form } : v));
      setEditando(null);
      Swal.fire({
        icon: 'success',
        title: 'Vaga atualizada com sucesso!',
        timer: 2000,
        showConfirmButton: false
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao atualizar vaga',
        text: 'Verifique os dados e tente novamente.',
      });
    }
  };

  return (
    <div className="minhas-vagas-container">
      <h2>🧾 Minhas Vagas</h2>
      {vagas.length === 0 ? (
        <p>Nenhuma vaga encontrada.</p>
      ) : (
        vagas.map(vaga => (
          <div className="vaga-card" key={vaga.id}>
            {editando === vaga.id ? (
              <form onSubmit={handleUpdate} className="form-editar">
                <input value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
                <input value={form.local} onChange={e => setForm({ ...form, local: e.target.value })} />
                <input value={form.salario} onChange={e => setForm({ ...form, salario: e.target.value })} />
                <textarea value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />
                <input value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />
                <input value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} />
                <button type="submit">Salvar</button>
                <button type="button" onClick={() => setEditando(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <h3>{vaga.titulo}</h3>
                <p><strong>Local:</strong> {vaga.local}</p>
                <p><strong>Salário:</strong> {vaga.salario}</p>
                <p><strong>Categoria:</strong> {vaga.categoria}</p>
                <p><strong>Área:</strong> {vaga.area}</p>
                <p>{vaga.descricao}</p>
                <div className="botoes">
                  <button onClick={() => handleEdit(vaga)}>✏️ Editar</button>
                  <button onClick={() => handleDelete(vaga.id)}>🗑️ Deletar</button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MinhasVagasEmpregador;
