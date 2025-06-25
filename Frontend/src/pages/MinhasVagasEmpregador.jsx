import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

  const empregadorId = localStorage.getItem('empregadorId');

  useEffect(() => {
    axios.get(`http://localhost:3001/api/vagas/empregador/${empregadorId}`)
      .then(res => setVagas(res.data))
      .catch(() => alert('Erro ao buscar suas vagas'));
  }, [empregadorId]);

  const handleDelete = async (id) => {
    if (!window.confirm('Deseja realmente excluir esta vaga?')) return;

    try {
      await axios.delete(`http://localhost:3001/api/vagas/${id}`);
      setVagas(vagas.filter(v => v.id !== id));
    } catch {
      alert('Erro ao excluir vaga');
    }
  };

  const handleEdit = (vaga) => {
    setEditando(vaga.id);
    setForm({ ...vaga });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/vagas/${editando}`, form);
      setVagas(vagas.map(v => (v.id === editando ? { ...v, ...form } : v)));
      setEditando(null);
    } catch {
      alert('Erro ao atualizar vaga');
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
                <input name="titulo" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} />
                <input name="local" value={form.local} onChange={e => setForm({ ...form, local: e.target.value })} />
                <input name="salario" value={form.salario} onChange={e => setForm({ ...form, salario: e.target.value })} />
                <textarea name="descricao" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} />
                <input name="categoria" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />
                <input name="area" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} />
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
