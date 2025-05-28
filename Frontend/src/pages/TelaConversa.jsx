import React from 'react';
import ListaContatos from './ListaContatos';
import { Outlet } from 'react-router-dom';

function TelaConversa() {
  return (
    <div style={{ display: 'flex' }}>
      <ListaContatos />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}

export default TelaConversa;
