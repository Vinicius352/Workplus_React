import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TelaInicial from './pages/TelaInicial';
import TelaLogin from './pages/TelaLogin';
import HomeUsuario from './pages/HomeUsuario';
import PainelVagas from './pages/PainelVagasEmpregador';
import TelaCadastro from './pages/TelaCadastro';
import TelaCurriculo from './pages/TelaCurriculo';
import TelaConversa from './pages/TelaConversa';
import CaixaDeEntrada from './pages/CaixaDeEntrada';
import PerfilUsuario from './pages/PerfilUsuario';
import TelaCadastroEmpregador from './pages/TelaCadastroEmpregador'
import HomeEmpregador from './pages/HomeEmpregador';
import CriarVaga from './pages/CriarVaga';
import MinhasVagas from './pages/MinhasVagasEmpregador';
import PainelVagasUsuario from './pages/PainelVagasUsuario';







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
        <Route path="/cadastro" element={<TelaCadastro />} />
        <Route path="/cadastro-empregador" element={<TelaCadastroEmpregador />} />
        <Route path="/empregador/home" element={<HomeEmpregador />} />
        <Route path="/criar-vaga" element={<CriarVaga />} />
        <Route path="/minhas-vagas" element={<MinhasVagas />} />
        <Route path="/painel-vagas" element={<PainelVagasUsuario />} />


        

        
        {/* Rota aninhada para chat com lista e conversa */}
        <Route path="/chat" element={<TelaConversa />}>
          <Route path=":id" element={<CaixaDeEntrada />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
