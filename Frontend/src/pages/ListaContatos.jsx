import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/ListaContatos.css';

const contatos = ['joao', 'maria', 'ana', 'lucas', 'bruna'];

function ListaContatos() {
  return (
    <div className="contatos-container">
      <h2>Conversas</h2>
      <ul>
        {contatos.map((nome) => (
          <li key={nome}>
            <Link to={`/chat/${nome}`}>{nome}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaContatos;
