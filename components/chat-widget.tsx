'use client';

import { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Olá! Como posso ajudá-lo?',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Adicionar mensagem do usuário
    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simular resposta do bot após 500ms
    setTimeout(() => {
      const botResponses = [
        'Como posso ajudá-lo com a SensorLink?',
        'Você tem alguma dúvida sobre nossos produtos?',
        'Gostaria de saber mais sobre automação residencial?',
        'Qual é a sua dúvida?',
        'Estou aqui para ajudar!',
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = { type: 'bot', text: randomResponse };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-widget">
      {/* Botão flutuante */}
      <button
        className="chat-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir chat"
      >
        💬
      </button>

      {/* Container do chat */}
      <div className={`chat-container ${!isOpen ? 'hidden' : ''}`}>
        {/* Header do chat */}
        <div className="chat-header">
          <h3>Dúvidas?</h3>
          <button
            className="chat-close"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar chat"
          >
            ✕
          </button>
        </div>

        {/* Mensagens */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              <p>{msg.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input e botão enviar */}
        <div className="chat-input-box">
          <input
            type="text"
            className="chat-input"
            placeholder="Escreva sua dúvida..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="chat-send"
            onClick={handleSendMessage}
            aria-label="Enviar mensagem"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
