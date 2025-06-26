import React, { useState, useEffect, useRef } from 'react';
import '../assets/css/ChatBox.css';

function CaixaDeEntrada() {
  const [mensagens, setMensagens] = useState([
    { texto: `Você iniciou uma conversa com Empregador`, lado: 'esquerda' },
  ]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const fimDasMensagens = useRef(null);

  const enviarMensagem = (e) => {
    e.preventDefault();
    if (novaMensagem.trim() === '') return;

    setMensagens((msgs) => [
      ...msgs,
      { texto: novaMensagem, lado: 'direita' },
      { texto: `Entrege ao Empregador 😉`, lado: 'esquerda' },
    ]);
    setNovaMensagem('');
  };

  useEffect(() => {
    fimDasMensagens.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  return (
    <div className="chat-container">
      <div className="chat-mensagens">
        {mensagens.map((msg, index) => (
          <div key={index} className={`mensagem ${msg.lado}`}>
            {msg.texto}
          </div>
        ))}
        <div ref={fimDasMensagens} />
      </div>
      <form className="chat-formulario" onSubmit={enviarMensagem}>
        <input
          type="text"
          placeholder={`Mensagem para o Empregador...`}
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CaixaDeEntrada;