import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaInicial from './pages/TelaInicial';
import TelaLogin from './pages/TelaLogin';
import HomeUsuario from './pages/HomeUsuario';
import PainelVagas from './pages/PainelVagas';
import TelaCadastro from './pages/TelaCadastro';
import TelaCurriculo from './pages/TelaCurriculo';
import TelaConversa from './pages/TelaConversa';
import CaixaDeEntrada from './pages/CaixaDeEntrada';
import PerfilUsuario from './pages/PerfilUsuario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TelaInicial />} />
        <Route path="/login" element={<TelaLogin />} />
        <Route path="/home" element={<HomeUsuario />} />
        <Route path="/painel" element={<PainelVagas />} />
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/curriculo" element={<TelaCurriculo />} />
        <Route path="/caixa-de-entrada" element={<CaixaDeEntrada />} />
        <Route path="/perfil" element={<PerfilUsuario />} />
        
        {/* Rota aninhada para chat com lista e conversa */}
        <Route path="/chat" element={<TelaConversa />}>
          <Route path=":id" element={<CaixaDeEntrada />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
