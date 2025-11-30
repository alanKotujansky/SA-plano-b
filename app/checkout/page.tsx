'use client'

import { useState, useEffect } from 'react'

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('pix')
  const [cartItems, setCartItems] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [formFields, setFormFields] = useState({
    'pix-name': '',
    'pix-email': '',
    'pix-cpf': '',
    'card-number': '',
    'phone': '',
    'card-exp': '',
    'card-name': '',
    'card-cvv': '',
    'address': '',
    'cpf': '',
    'complement': '',
  })

  useEffect(() => {
    displayCartItems()
    updateCartBadge()
  }, [])

  const displayCartItems = () => {
    const cart = JSON.parse(localStorage.getItem('sl_cart') || '[]')
    setTotalItems(cart.length)

    if (cart.length === 0) {
      setCartItems([])
      return
    }

    const products = {}
    cart.forEach(item => {
      products[item.name] = (products[item.name] || 0) + 1
    })

    const items = Object.entries(products).map(([name, qty]) => ({
      name,
      qty
    }))
    setCartItems(items)
  }

  const updateCartBadge = () => {
    const cart = JSON.parse(localStorage.getItem('sl_cart') || '[]')
    const badge = document.getElementById('cartBadge')
    if (badge) {
      badge.textContent = cart.length
    }
  }

  const changeQuantity = (name, delta) => {
    let cart = JSON.parse(localStorage.getItem('sl_cart') || '[]')
    if (delta > 0) {
      for (let i = 0; i < delta; i++) cart.push({ name: name, date: new Date().toISOString() })
    } else if (delta < 0) {
      let toRemove = Math.abs(delta)
      for (let i = cart.length - 1; i >= 0 && toRemove > 0; i--) {
        if (cart[i].name === name) {
          cart.splice(i, 1)
          toRemove--
        }
      }
    }
    localStorage.setItem('sl_cart', JSON.stringify(cart))
    updateCartBadge()
    displayCartItems()
  }

  const removeProduct = (name) => {
    if (!confirm('Remover todos os itens "' + name + '" do carrinho?')) return
    let cart = JSON.parse(localStorage.getItem('sl_cart') || '[]')
    cart = cart.filter(item => item.name !== name)
    localStorage.setItem('sl_cart', JSON.stringify(cart))
    updateCartBadge()
    displayCartItems()
  }

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  const handleFieldChange = (fieldId, value) => {
    setFormFields(prev => ({
      ...prev,
      [fieldId]: value
    }))
  }

  const isFormValid = () => {
    if (totalItems === 0) return false

    if (paymentMethod === 'pix') {
      return formFields['pix-name'].trim() && formFields['pix-email'].trim() && formFields['pix-cpf'].trim()
    } else {
      // Crédito ou Débito
      return formFields['card-number'].trim() && 
             formFields['phone'].trim() && 
             formFields['card-exp'].trim() && 
             formFields['card-name'].trim() && 
             formFields['card-cvv'].trim() && 
             formFields['address'].trim() && 
             formFields['cpf'].trim()
    }
  }

  const handlePixProceed = () => {
    if (totalItems === 0) {
      alert('Por favor adicione pelo menos 1 item ao carrinho.')
      return
    }

    const { 'pix-name': fullName, 'pix-email': email, 'pix-cpf': cpf } = formFields

    if (!fullName.trim() || !email.trim() || !cpf.trim()) {
      alert('Por favor preencha Nome completo, Email e CPF para prosseguir com Pix.')
      return
    }

    const cart = JSON.parse(localStorage.getItem('sl_cart') || '[]')
    const info = { fullName, email, cpf, totalItems: cart.length, cart }
    sessionStorage.setItem('pix_payment_info', JSON.stringify(info))
    window.location.href = '/pix-payment'
  }

  const handleCheckoutSubmit = (e) => {
    e.preventDefault()

    if (totalItems === 0) {
      alert('Por favor adicione pelo menos 1 item ao carrinho.')
      return
    }

    const payEl = document.querySelector('input[name="pay"]:checked') as HTMLInputElement
    const pay = payEl ? payEl.value : '(não selecionado)'

    if (paymentMethod !== 'pix') {
      if (!formFields['card-number'].trim() || !formFields['card-name'].trim() || !formFields['card-cvv'].trim() || !formFields['address'].trim() || !formFields['cpf'].trim()) {
        alert('Por favor preencha todos os campos obrigatórios.')
        return
      }
    }

    alert('Compra finalizada com sucesso via ' + pay + '! Obrigado pela compra.')
    localStorage.removeItem('sl_cart')
    updateCartBadge()
    window.location.href = '/'
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">Sensor<span>Link</span></div>
          <nav className="main-nav">
            <a className="nav-link" href="/">Início</a>
            <a className="nav-link" href="/produtos">Produtos</a>
            <div className="nav-cart-container">
              <a className="nav-link" href="/checkout">🛒 Carrinho</a>
              <span className="cart-badge" id="cartBadge">0</span>
            </div>
            <a className="nav-link" href="/login">Entrar</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container checkout-page">
          <div id="cartSummary" className="cart-summary">
            <h2>Resumo do Carrinho</h2>
            <div id="cartItems" className="cart-items-list">
              {cartItems.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '20px' }}>Seu carrinho está vazio</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.name} className="cart-item">
                    <div className="cart-item-left">
                      <span className="cart-item-name">{item.name}</span>
                    </div>
                    <div className="cart-item-right">
                      <div className="qty-controls">
                        <button className="qty-btn btn-decrease" onClick={() => changeQuantity(item.name, -1)}>-</button>
                        <span className="cart-item-qty"><strong>{item.qty}</strong></span>
                        <button className="qty-btn btn-increase" onClick={() => changeQuantity(item.name, 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeProduct(item.name)}>Remover</button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="cart-total">
              <strong>Total de itens: <span id="totalItems">{totalItems}</span></strong>
            </div>
          </div>

          <form id="checkoutForm" className="checkout-form" onSubmit={handleCheckoutSubmit}>
            <h2>Forma de pagamento</h2>
            <div className="payments-group">
              <label className="payment-option">
                <input type="radio" name="pay" value="pix" checked={paymentMethod === 'pix'} onChange={handlePaymentChange} />
                <span>Pix</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="pay" value="credito" checked={paymentMethod === 'credito'} onChange={handlePaymentChange} />
                <span>Crédito</span>
              </label>
              <label className="payment-option">
                <input type="radio" name="pay" value="debito" checked={paymentMethod === 'debito'} onChange={handlePaymentChange} />
                <span>Débito</span>
              </label>
            </div>

            <h3>Informações</h3>

            <div id="pixDetails" className={`form-grid ${paymentMethod === 'pix' ? '' : 'hidden'}`}>
              <div className="form-group">
                <label>Nome completo</label>
                <input 
                  type="text" 
                  id="pix-name" 
                  placeholder="Nome completo"
                  value={formFields['pix-name']}
                  onChange={(e) => handleFieldChange('pix-name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  type="email" 
                  id="pix-email" 
                  placeholder="seu@email.com"
                  value={formFields['pix-email']}
                  onChange={(e) => handleFieldChange('pix-email', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>CPF</label>
                <input 
                  type="text" 
                  id="pix-cpf" 
                  placeholder="000.000.000-00"
                  value={formFields['pix-cpf']}
                  onChange={(e) => handleFieldChange('pix-cpf', e.target.value)}
                />
              </div>
            </div>

            <div id="cardFields" className={`form-grid ${paymentMethod === 'pix' ? 'hidden' : ''}`}>
              <div className="form-group">
                <label>Número do cartão</label>
                <input 
                  type="text" 
                  id="card-number"
                  value={formFields['card-number']}
                  onChange={(e) => handleFieldChange('card-number', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Número de telefone</label>
                <input 
                  type="text" 
                  id="phone"
                  value={formFields['phone']}
                  onChange={(e) => handleFieldChange('phone', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Data de validade</label>
                <input 
                  type="text" 
                  id="card-exp"
                  value={formFields['card-exp']}
                  onChange={(e) => handleFieldChange('card-exp', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nome no cartão</label>
                <input 
                  type="text" 
                  id="card-name"
                  value={formFields['card-name']}
                  onChange={(e) => handleFieldChange('card-name', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Código de segurança</label>
                <input 
                  type="text" 
                  id="card-cvv"
                  value={formFields['card-cvv']}
                  onChange={(e) => handleFieldChange('card-cvv', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <input 
                  type="text" 
                  id="address"
                  value={formFields['address']}
                  onChange={(e) => handleFieldChange('address', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>CPF</label>
                <input 
                  type="text" 
                  id="cpf"
                  value={formFields['cpf']}
                  onChange={(e) => handleFieldChange('cpf', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Complemento</label>
                <input 
                  type="text" 
                  id="complement"
                  value={formFields['complement']}
                  onChange={(e) => handleFieldChange('complement', e.target.value)}
                />
              </div>
            </div>

            <div className="checkout-actions">
              <button 
                type="button" 
                id="pixProceedBtn" 
                className={`btn-comprar ${paymentMethod === 'pix' ? '' : 'hidden'}`}
                onClick={handlePixProceed}
                disabled={!isFormValid()}
                style={{ opacity: !isFormValid() ? 0.5 : 1, cursor: !isFormValid() ? 'not-allowed' : 'pointer' }}
              >
                Prosseguir com a compra
              </button>
              <button 
                type="submit" 
                id="confirmBuy" 
                className={`btn-comprar ${paymentMethod === 'pix' ? 'hidden' : ''}`}
                disabled={!isFormValid()}
                style={{ opacity: !isFormValid() ? 0.5 : 1, cursor: !isFormValid() ? 'not-allowed' : 'pointer' }}
              >
                Comprar
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">© 2025 SensorLink - Todos os direitos reservados
          <div className="contact">+55 48 XXXXX-XX</div>
        </div>
      </footer>
      <script src="/chat.js"></script>
    </>
  )
}
