// ===== CHAT WIDGET FLUTUANTE =====

function initChatWidget() {
  // Verificar se já existe widget na página
  if(document.getElementById('chat-widget')) return;

  // Criar HTML do widget
  const chatHTML = `
    <div id="chat-widget" class="chat-widget">
      <!-- Botão flutuante -->
      <button id="chat-toggle" class="chat-toggle" title="Abrir suporte">
        💬
      </button>

      <!-- Container do chat -->
      <div id="chat-container" class="chat-container hidden">
        <!-- Header -->
        <div class="chat-header">
          <h3>Suporte SensorLink</h3>
          <button id="chat-close" class="chat-close">✕</button>
        </div>

        <!-- Mensagens -->
        <div id="chat-messages" class="chat-messages">
          <div class="chat-message bot">
            <p>Olá! 👋 Bem-vindo ao suporte SensorLink. Como posso ajudá-lo?</p>
          </div>
        </div>

        <!-- Input -->
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

  // Adicionar ao body
  document.body.insertAdjacentHTML('beforeend', chatHTML);

  // Elementos
  const toggle = document.getElementById('chat-toggle');
  const close = document.getElementById('chat-close');
  const container = document.getElementById('chat-container');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const messages = document.getElementById('chat-messages');

  // Toggle abrir/fechar
  toggle.addEventListener('click', () => {
    container.classList.toggle('hidden');
    if(!container.classList.contains('hidden')) {
      input.focus();
    }
  });

  close.addEventListener('click', () => {
    container.classList.add('hidden');
  });

  // Enviar mensagem
  function sendMessage() {
    const text = input.value.trim();
    if(!text) return;

    // Mensagem do usuário
    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<p>${escapeHtml(text)}</p>`;
    messages.appendChild(userMsg);
    input.value = '';

    // Scroll para baixo
    messages.scrollTop = messages.scrollHeight;

    // Resposta automática do bot (simulada)
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

// Respostas automáticas do bot
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

// Escape HTML para segurança
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Inicializar quando o DOM estiver pronto
if(document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatWidget);
} else {
  initChatWidget();
}
