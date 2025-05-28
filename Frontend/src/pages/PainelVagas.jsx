import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/PainelVagas.css';

function PainelVagas() {
  const [vagas, setVagas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    setVagas([
      {
        id: 1,
        titulo: 'Desenvolvedor Front-End',
        local: 'São Paulo, SP',
        salario: 'R$ 6.500,00',
        descricao: 'Experiência com React, JavaScript e CSS.',
        categoria: 'Tecnologia',
      },
      {
        id: 2,
        titulo: 'Analista de Marketing',
        local: 'Belo Horizonte, MG',
        salario: 'R$ 4.200,00',
        descricao: 'Planejamento de campanhas de mídias sociais.',
        categoria: 'Marketing',
      },
      {
        id: 3,
        titulo: 'Designer Gráfico',
        local: 'Rio de Janeiro, RJ',
        salario: 'R$ 3.800,00',
        descricao: 'Criação de identidade visual e materiais gráficos.',
        categoria: 'Design',
      },
      
    ]);
  }, []);

  const handleCadastrar = () => {
    
    const isLoggedIn = localStorage.getItem('logado'); 
    if (!isLoggedIn) {
      alert('Você precisa estar logado para se candidatar!');
      navigate('/login'); 
    } else {
      
      alert('Você se candidatou com sucesso!');
    }
  };

  return (
    <div className="vagas-container">
      <h2>Vagas Disponíveis</h2>
      <div className="vagas-list">
        {vagas.map((vaga) => (
          <div key={vaga.id} className="vaga-card">
            <h3>{vaga.titulo}</h3>
            <p><strong>Local:</strong> {vaga.local}</p>
            <p><strong>Salário:</strong> {vaga.salario}</p>
            <p><strong>Categoria:</strong> {vaga.categoria}</p>
            <p>{vaga.descricao}</p>
            <button onClick={handleCadastrar} className="btn-candidatar">
              Candidatar-se
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PainelVagas;
