// ===== CARRINHO DE COMPRAS =====
function initCart(){
  updateCartBadge();
}

function addToCart(productName){
  let cart = JSON.parse(localStorage.getItem('sl_cart') || '[]');
  cart.push({name: productName, date: new Date().toISOString()});
  localStorage.setItem('sl_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge(){
  const cart = JSON.parse(localStorage.getItem('sl_cart') || '[]');
  const badge = document.getElementById('cartBadge');
  if(badge){
    badge.textContent = cart.length;
  }
}

// Inicializar carrinho
initCart();

// ===== CARROSSEL PRINCIPAL =====
const carouselEl = document.querySelector('.carousel');
if(carouselEl){
  const slides = Array.from(document.querySelectorAll('.carousel .slide'));
  let slideIndex = 0;
  function showSlide(i){
    slides.forEach(s=>s.classList.remove('active'));
    slides[(i+slides.length)%slides.length].classList.add('active');
  }
  const next = carouselEl.querySelector('.carousel-next');
  const prev = carouselEl.querySelector('.carousel-prev');
  if(next) next.addEventListener('click', ()=>{ slideIndex++; showSlide(slideIndex); });
  if(prev) prev.addEventListener('click', ()=>{ slideIndex--; showSlide(slideIndex); });
  setInterval(()=>{ slideIndex++; showSlide(slideIndex); },5000);
}

// ===== LOGIN =====
const loginBtn = document.getElementById('loginBtn');
if(loginBtn){
  loginBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const emailEl = document.getElementById('login-email');
    const passEl = document.getElementById('login-pass');
    const email = emailEl ? emailEl.value.trim() : '';
    const pass = passEl ? passEl.value : '';
    
    if(!email || !pass){
      alert('Por favor, preencha email/telefone e senha.');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('sl_users') || '{}');
    
    if(users[email] && users[email].pass === pass){
      localStorage.setItem('sl_current', email);
      alert('Login efetuado com sucesso! Bem-vindo, ' + users[email].name + '!');
      window.location.href = 'index.html';
    } else {
      alert('Email/telefone ou senha inválidos. Tente novamente ou cadastre-se.');
    }
  });
}

// ===== CADASTRO =====
const registerBtn = document.getElementById('registerBtn');
if(registerBtn){
  registerBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const nameEl = document.getElementById('reg-name');
    const emailEl = document.getElementById('reg-email');
    const passEl = document.getElementById('reg-pass');
    const pass2El = document.getElementById('reg-pass2');
    
    const name = nameEl ? nameEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const pass = passEl ? passEl.value : '';
    const pass2 = pass2El ? pass2El.value : '';
    
    if(!name || !email || !pass){
      alert('Por favor, preencha nome, email/telefone e senha.');
      return;
    }
    
    if(pass !== pass2){
      alert('As senhas não conferem. Tente novamente.');
      return;
    }
    
    const users = JSON.parse(localStorage.getItem('sl_users') || '{}');
    
    if(users[email]){
      alert('Usuário já cadastrado com este email/telefone. Faça login ou use outro email.');
      return;
    }
    
    users[email] = { name, pass };
    localStorage.setItem('sl_users', JSON.stringify(users));
    alert('Cadastro realizado com sucesso! Agora faça login com suas credenciais.');
    window.location.href = 'login.html';
  });
}

// ===== FAQs =====
document.querySelectorAll('.faq-btn').forEach(b=>{
  b.addEventListener('click', ()=>{ alert('Resposta: Sim! Funciona.'); });
});

// ===== CHECKOUT - EXIBIR CARRINHO =====
const cartItemsList = document.getElementById('cartItems');
if(cartItemsList){
  displayCartItems();
}

function displayCartItems(){
  const cart = JSON.parse(localStorage.getItem('sl_cart') || '[]');
  const cartItemsList = document.getElementById('cartItems');
  const totalItems = document.getElementById('totalItems');
  
  if(!cartItemsList) return;
  
  cartItemsList.innerHTML = '';
  
  if(cart.length === 0){
    cartItemsList.innerHTML = '<p style="color:#999;text-align:center;padding:20px">Seu carrinho está vazio</p>';
    if(totalItems) totalItems.textContent = '0';
    return;
  }
  
  // Contar produtos iguais
  const products = {};
  cart.forEach(item => {
    products[item.name] = (products[item.name] || 0) + 1;
  });
  
  // Exibir produtos com controles de quantidade e remoção
  Object.entries(products).forEach(([name, qty]) => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <div class="cart-item-left">
        <span class="cart-item-name">${name}</span>
      </div>
      <div class="cart-item-right">
        <div class="qty-controls">
          <button class="qty-btn btn-decrease" data-name="${name}">-</button>
          <span class="cart-item-qty"><strong>${qty}</strong></span>
          <button class="qty-btn btn-increase" data-name="${name}">+</button>
        </div>
        <button class="remove-btn" data-name="${name}">Remover</button>
      </div>
    `;
    cartItemsList.appendChild(div);

    // listeners
    const decBtn = div.querySelector('.btn-decrease');
    const incBtn = div.querySelector('.btn-increase');
    const remBtn = div.querySelector('.remove-btn');
    if(incBtn) incBtn.addEventListener('click', ()=>{ changeQuantity(name, 1); });
    if(decBtn) decBtn.addEventListener('click', ()=>{ changeQuantity(name, -1); });
    if(remBtn) remBtn.addEventListener('click', ()=>{ removeProduct(name); });
  });
  
  if(totalItems) totalItems.textContent = cart.length;
}

// Altera quantidade do produto no carrinho (usa instâncias na lista)
function changeQuantity(name, delta){
  let cart = JSON.parse(localStorage.getItem('sl_cart') || '[]');
  if(delta > 0){
    for(let i=0;i<delta;i++) cart.push({ name: name, date: new Date().toISOString() });
  } else if(delta < 0){
    let toRemove = Math.abs(delta);
    for(let i = cart.length - 1; i >= 0 && toRemove > 0; i--){
      if(cart[i].name === name){ cart.splice(i, 1); toRemove--; }
    }
  }
  localStorage.setItem('sl_cart', JSON.stringify(cart));
  updateCartBadge();
  displayCartItems();
}

function removeProduct(name){
  if(!confirm('Remover todos os itens "' + name + '" do carrinho?')) return;
  let cart = JSON.parse(localStorage.getItem('sl_cart') || '[]');
  cart = cart.filter(item => item.name !== name);
  localStorage.setItem('sl_cart', JSON.stringify(cart));
  updateCartBadge();
  displayCartItems();
}

// Atualizar carrinho ao chegar na página
if(window.location.pathname.includes('checkout')){
  displayCartItems();
}

// ===== PIX: controlar UI e prosseguir =====
function setupPixFlow(){
  const payRadios = document.querySelectorAll('input[name="pay"]');
  const pixDetails = document.getElementById('pixDetails');
  const cardFields = document.getElementById('cardFields');
  const pixProceedBtn = document.getElementById('pixProceedBtn');
  const confirmBuy = document.getElementById('confirmBuy');

  if(!payRadios || (!pixDetails && !cardFields)) return;

  function updatePaymentUI(){
    const selected = document.querySelector('input[name="pay"]:checked')?.value;
    if(selected === 'pix'){
      if(pixDetails) pixDetails.classList.remove('hidden');
      if(cardFields) cardFields.classList.add('hidden');
      if(pixProceedBtn) pixProceedBtn.classList.remove('hidden');
      if(confirmBuy) confirmBuy.classList.add('hidden');
    } else {
      if(pixDetails) pixDetails.classList.add('hidden');
      if(cardFields) cardFields.classList.remove('hidden');
      if(pixProceedBtn) pixProceedBtn.classList.add('hidden');
      if(confirmBuy) confirmBuy.classList.remove('hidden');
    }
  }

  payRadios.forEach(r => r.addEventListener('change', updatePaymentUI));
  // inicializar estado
  updatePaymentUI();

  if(pixProceedBtn){
    pixProceedBtn.addEventListener('click', ()=>{
      const fullName = document.getElementById('pix-name')?.value.trim();
      const email = document.getElementById('pix-email')?.value.trim();
      const cpf = document.getElementById('pix-cpf')?.value.trim();

      if(!fullName || !email || !cpf){
        alert('Por favor preencha Nome completo, Email e CPF para prosseguir com Pix.');
        return;
      }

      const cart = JSON.parse(localStorage.getItem('sl_cart') || '[]');
      const totalItems = cart.length;

      const info = { fullName, email, cpf, totalItems, cart };
      try{ sessionStorage.setItem('pix_payment_info', JSON.stringify(info)); }catch(e){ console.warn('sessionStorage não disponível', e); }

      // redirecionar para página de pagamento Pix
      window.location.href = 'pix_payment.html';
    });
  }
}

// inicializar fluxo Pix quando na página de checkout
if(window.location.pathname.includes('checkout')){
  setupPixFlow();
}

// ===== CHECKOUT SUBMIT =====
const checkoutForm = document.getElementById('checkoutForm');
if(checkoutForm){
  checkoutForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const payEl = document.querySelector('input[name="pay"]:checked');
    const pay = payEl ? payEl.value : '(não selecionado)';
    alert('Compra finalizada com sucesso via ' + pay + '! Obrigado pela compra.');
    checkoutForm.reset();
    // Limpar carrinho
    localStorage.removeItem('sl_cart');
    updateCartBadge();
    window.location.href = 'index.html';
  });
}

// ===== BOTÃO COMPRAR =====
const buyBtn = document.getElementById('buyBtn');
if(buyBtn && buyBtn.tagName.toLowerCase() === 'button'){
  buyBtn.addEventListener('click', ()=>{ window.location.href = 'checkout.html'; });
}
