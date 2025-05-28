import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import '../assets/css/ChatBox.css';

function CaixaDeEntrada() {
  const { id: nomeContato } = useParams();
  const [mensagens, setMensagens] = useState([
    { texto: `Você iniciou uma conversa com ${nomeContato}`, lado: 'esquerda' },
  ]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const fimDasMensagens = useRef(null);

  const enviarMensagem = (e) => {
    e.preventDefault();
    if (novaMensagem.trim() === '') return;

    setMensagens((msgs) => [
      ...msgs,
      { texto: novaMensagem, lado: 'direita' },
      { texto: `Recebido por ${nomeContato} 😉`, lado: 'esquerda' },
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
          placeholder={`Mensagem para ${nomeContato}...`}
          value={novaMensagem}
          onChange={(e) => setNovaMensagem(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default CaixaDeEntrada;