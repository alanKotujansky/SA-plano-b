// ===== CHAT WIDGET FLUTUANTE =====

function initChatWidget() {
  if(document.getElementById('chat-widget')) return;

  const chatHTML = `
    <div id="chat-widget" class="chat-widget">
      <button id="chat-toggle" class="chat-toggle" title="Abrir suporte">
        💬
      </button>

      <div id="chat-container" class="chat-container hidden">
        <div class="chat-header">
          <h3>Suporte SensorLink</h3>
          <button id="chat-close" class="chat-close">✕</button>
        </div>

        <div id="chat-messages" class="chat-messages">
          <div class="chat-message bot">
            <p>Olá! 👋 Bem-vindo ao suporte SensorLink. Como posso ajudá-lo?</p>
          </div>
        </div>

        <div class="chat-input-box">
          <input 
            id="chat-input" 
            type="text" 
            placeholder="Digite sua mensagem..." 
            class="chat-input"
          >
          <button id="chat-send" class="chat-send">Enviar</button>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', chatHTML);

  const toggle = document.getElementById('chat-toggle');
  const close = document.getElementById('chat-close');
  const container = document.getElementById('chat-container');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

  toggle.addEventListener('click', () => {
    container.classList.toggle('hidden');
    if(!container.classList.contains('hidden')) {
      input.focus();
    }
  });

  close.addEventListener('click', () => {
    container.classList.add('hidden');
  });

  function sendMessage() {
    const text = input.value.trim();
    if(!text) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<p>${escapeHtml(text)}</p>`;
    messages.appendChild(userMsg);
    input.value = '';

    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
      const botMsg = document.createElement('div');
      botMsg.className = 'chat-message bot';
      botMsg.innerHTML = `<p>${getRandomResponse()}</p>`;
      messages.appendChild(botMsg);
      messages.scrollTop = messages.scrollHeight;
    }, 600);
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') sendMessage();
  });
}

function getRandomResponse() {
  const respostas = [
    '😊 Ótima pergunta! Você pode verificar nossa documentação ou falar com nosso time.',
    'Entendi sua dúvida! Posso passar para um especialista. Um momento...',
    '👍 Temos uma solução para isso! Qual é o seu produto?',
    'Você pode encontrar mais informações em nossa página de Produtos.',
    'Agradeço o contato! Retornaremos em breve com a resposta.',
    'Posso ajudar com informações sobre preços, produtos ou pagamento!',
    'Que bom saber! Há algo mais que eu possa ajudar?'
  ];
  return respostas[Math.floor(Math.random() * respostas.length)];
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatWidget);
} else {
  initChatWidget();
}
