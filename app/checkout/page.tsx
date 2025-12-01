"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase"

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("pix")
  const [cartItems, setCartItems] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [savedCards, setSavedCards] = useState([])
  const [userEmail, setUserEmail] = useState("")
  const [formFields, setFormFields] = useState({
    "pix-name": "",
    "pix-email": "",
    "pix-cpf": "",
    "card-number": "",
    phone: "",
    "card-exp": "",
    "card-name": "",
    "card-cvv": "",
    address: "",
    cpf: "",
    complement: "",
  })

  useEffect(() => {
    displayCartItems()
    updateCartBadge()
    const email = localStorage.getItem("user_email")
    if (email) {
      setUserEmail(email)
      loadSavedCards(email)
    }
  }, [])

  const loadSavedCards = async (email: string) => {
    console.log("[v0] Carregando cartões salvos para:", email)
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("cartoes")
        .select("*")
        .eq("email", email)
        .order("data_registro", { ascending: false })

      if (error) {
        console.error("[v0] Erro ao carregar cartões:", error)
        throw error
      }
      console.log("[v0] Cartões carregados:", data)
      setSavedCards(data || [])
    } catch (error) {
      console.error("[v0] Erro ao carregar cartões:", error)
    }
  }

  const decodeCardNumber = (token: string) => {
    // Em produção, isso seria feito no backend com chave privada
    // Aqui estamos simulando a decodificação
    try {
      return atob(token)
    } catch {
      return ""
    }
  }

  const loadCardToForm = (card: any) => {
    const cardNumber = decodeCardNumber(card.numero_tokenizado)
    setFormFields({
      ...formFields,
      "card-number": cardNumber,
      "card-name": card.nome_impresso,
      "card-exp": `${card.validade_mes}/${card.validade_ano}`,
      "card-cvv": "", // CVV nunca é salvo, usuário precisa digitar
    })

    // Muda para o tipo de pagamento correto
    setPaymentMethod(card.tipo)
  }

  const saveCard = async () => {
    if (!userEmail) {
      alert("Você precisa estar logado para salvar cartões.")
      return
    }

    const cardNumber = formFields["card-number"].replace(/\s/g, "")
    if (cardNumber.length < 16) {
      alert("Número de cartão inválido.")
      return
    }

    const [mes, ano] = formFields["card-exp"].split("/")
    if (!mes || !ano) {
      alert("Data de validade inválida.")
      return
    }

    // Detectar bandeira
    const firstDigit = cardNumber[0]
    let bandeira = "Outro"
    if (firstDigit === "4") bandeira = "Visa"
    else if (firstDigit === "5") bandeira = "Mastercard"
    else if (firstDigit === "3") bandeira = "Amex"

    try {
      const supabase = createClient()

      // Tokenizar o número (criptografar em base64 como exemplo simples)
      // Em produção, usar criptografia real no backend
      const numeroTokenizado = btoa(cardNumber)

      const { error } = await supabase.from("cartoes").insert([
        {
          email: userEmail,
          tipo: paymentMethod,
          nome_impresso: formFields["card-name"],
          bandeira: bandeira,
          ultimos_digitos: cardNumber.slice(-4),
          validade_mes: mes.padStart(2, "0"),
          validade_ano: ano,
          numero_tokenizado: numeroTokenizado,
        },
      ])

      if (error) throw error

      alert("Cartão salvo com sucesso!")
      loadSavedCards(userEmail)
    } catch (error) {
      console.error("Erro ao salvar cartão:", error)
      alert("Erro ao salvar cartão. Tente novamente.")
    }
  }

  const deleteCard = async (idCartao: number) => {
    if (!confirm("Deseja realmente excluir este cartão?")) return

    try {
      const supabase = createClient()
      const { error } = await supabase.from("cartoes").delete().eq("id_cartao", idCartao)

      if (error) throw error

      alert("Cartão excluído com sucesso!")
      loadSavedCards(userEmail)
    } catch (error) {
      console.error("Erro ao excluir cartão:", error)
      alert("Erro ao excluir cartão.")
    }
  }

  const displayCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("sl_cart") || "[]")
    setTotalItems(cart.length)

    if (cart.length === 0) {
      setCartItems([])
      return
    }

    const products = {}
    cart.forEach((item) => {
      products[item.name] = (products[item.name] || 0) + 1
    })

    const items = Object.entries(products).map(([name, qty]) => ({
      name,
      qty,
    }))
    setCartItems(items)
  }

  const updateCartBadge = () => {
    const cart = JSON.parse(localStorage.getItem("sl_cart") || "[]")
    const badge = document.getElementById("cartBadge")
    if (badge) {
      badge.textContent = cart.length
    }
  }

  const changeQuantity = (name, delta) => {
    const cart = JSON.parse(localStorage.getItem("sl_cart") || "[]")
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
    localStorage.setItem("sl_cart", JSON.stringify(cart))
    updateCartBadge()
    displayCartItems()
  }

  const removeProduct = (name) => {
    if (!confirm('Remover todos os itens "' + name + '" do carrinho?')) return
    let cart = JSON.parse(localStorage.getItem("sl_cart") || "[]")
    cart = cart.filter((item) => item.name !== name)
    localStorage.setItem("sl_cart", JSON.stringify(cart))
    updateCartBadge()
    displayCartItems()
  }

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value)
  }

  const handleFieldChange = (fieldId, value) => {
    setFormFields((prev) => ({
      ...prev,
      [fieldId]: value,
    }))
  }

  const isFormValid = () => {
    if (totalItems === 0) return false

    if (paymentMethod === "pix") {
      return formFields["pix-name"].trim() && formFields["pix-email"].trim() && formFields["pix-cpf"].trim()
    } else {
      return (
        formFields["card-number"].trim() &&
        formFields["phone"].trim() &&
        formFields["card-exp"].trim() &&
        formFields["card-name"].trim() &&
        formFields["card-cvv"].trim() &&
        formFields["address"].trim() &&
        formFields["cpf"].trim()
      )
    }
  }

  const handlePixProceed = () => {
    if (totalItems === 0) {
      alert("Por favor adicione pelo menos 1 item ao carrinho.")
      return
    }

    const { "pix-name": fullName, "pix-email": email, "pix-cpf": cpf } = formFields

    if (!fullName.trim() || !email.trim() || !cpf.trim()) {
      alert("Por favor preencha Nome completo, Email e CPF para prosseguir com Pix.")
      return
    }

    const cart = JSON.parse(localStorage.getItem("sl_cart") || "[]")
    const info = { fullName, email, cpf, totalItems: cart.length, cart }
    sessionStorage.setItem("pix_payment_info", JSON.stringify(info))
    window.location.href = "/pix-payment"
  }

  const handleCheckoutSubmit = (e) => {
    e.preventDefault()

    if (totalItems === 0) {
      alert("Por favor adicione pelo menos 1 item ao carrinho.")
      return
    }

    const payEl = document.querySelector('input[name="pay"]:checked') as HTMLInputElement
    const pay = payEl ? payEl.value : "(não selecionado)"

    if (paymentMethod !== "pix") {
      if (
        !formFields["card-number"].trim() ||
        !formFields["card-name"].trim() ||
        !formFields["card-cvv"].trim() ||
        !formFields["address"].trim() ||
        !formFields["cpf"].trim()
      ) {
        alert("Por favor preencha todos os campos obrigatórios.")
        return
      }
    }

    alert("Compra finalizada com sucesso via " + pay + "! Obrigado pela compra.")
    localStorage.removeItem("sl_cart")
    updateCartBadge()
    window.location.href = "/"
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            Sensor<span>Link</span>
          </div>
          <nav className="main-nav">
            <a className="nav-link" href="/">
              Início
            </a>
            <a className="nav-link" href="/produtos">
              Produtos
            </a>
            <div className="nav-cart-container">
              <a className="nav-link" href="/checkout">
                🛒 Carrinho
              </a>
              <span className="cart-badge" id="cartBadge">
                0
              </span>
            </div>
            <a className="nav-link" href="/login">
              Entrar
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container checkout-page">
          <div id="cartSummary" className="cart-summary">
            <h2>Resumo do Carrinho</h2>
            <div id="cartItems" className="cart-items-list">
              {cartItems.length === 0 ? (
                <p style={{ color: "#999", textAlign: "center", padding: "20px" }}>Seu carrinho está vazio</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.name} className="cart-item">
                    <div className="cart-item-left">
                      <span className="cart-item-name">{item.name}</span>
                    </div>
                    <div className="cart-item-right">
                      <div className="qty-controls">
                        <button className="qty-btn btn-decrease" onClick={() => changeQuantity(item.name, -1)}>
                          -
                        </button>
                        <span className="cart-item-qty">
                          <strong>{item.qty}</strong>
                        </span>
                        <button className="qty-btn btn-increase" onClick={() => changeQuantity(item.name, 1)}>
                          +
                        </button>
                      </div>
                      <button className="remove-btn" onClick={() => removeProduct(item.name)}>
                        Remover
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="cart-total">
              <strong>
                Total de itens: <span id="totalItems">{totalItems}</span>
              </strong>
            </div>
          </div>

          <form id="checkoutForm" className="checkout-form" onSubmit={handleCheckoutSubmit}>
            <h2>Forma de pagamento</h2>
            <div className="payments-group">
              <label className="payment-option">
                <input
                  type="radio"
                  name="pay"
                  value="pix"
                  checked={paymentMethod === "pix"}
                  onChange={handlePaymentChange}
                />
                <span>Pix</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="pay"
                  value="credito"
                  checked={paymentMethod === "credito"}
                  onChange={handlePaymentChange}
                />
                <span>Crédito</span>
              </label>
              <label className="payment-option">
                <input
                  type="radio"
                  name="pay"
                  value="debito"
                  checked={paymentMethod === "debito"}
                  onChange={handlePaymentChange}
                />
                <span>Débito</span>
              </label>
            </div>

            <h3>Informações</h3>

            <div id="pixDetails" className={`form-grid ${paymentMethod === "pix" ? "" : "hidden"}`}>
              <div className="form-group">
                <label>Nome completo</label>
                <input
                  type="text"
                  id="pix-name"
                  placeholder="Nome completo"
                  value={formFields["pix-name"]}
                  onChange={(e) => handleFieldChange("pix-name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  id="pix-email"
                  placeholder="seu@email.com"
                  value={formFields["pix-email"]}
                  onChange={(e) => handleFieldChange("pix-email", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>CPF</label>
                <input
                  type="text"
                  id="pix-cpf"
                  placeholder="000.000.000-00"
                  value={formFields["pix-cpf"]}
                  onChange={(e) => handleFieldChange("pix-cpf", e.target.value)}
                />
              </div>
            </div>

            {userEmail && savedCards.length > 0 && paymentMethod !== "pix" && (
              <div className="saved-cards-section">
                <h3>Cartões Salvos</h3>
                <div className="saved-cards-list">
                  {savedCards.map((card) => (
                    <div key={card.id_cartao} className="saved-card-item">
                      <button
                        type="button"
                        className="saved-card-btn"
                        onClick={() => loadCardToForm(card)}
                        title={`Carregar cartão ${card.bandeira}`}
                      >
                        <span className="card-icon">{card.tipo === "credito" ? "💳" : "💳"}</span>
                        <span className="card-dots">••••</span>
                        <span className="card-last-digits">{card.ultimos_digitos}</span>
                        <span className="card-brand">{card.bandeira}</span>
                      </button>
                      <button
                        type="button"
                        className="delete-card-btn"
                        onClick={() => deleteCard(card.id_cartao)}
                        title="Excluir cartão"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div id="cardFields" className={`form-grid ${paymentMethod === "pix" ? "hidden" : ""}`}>
              <div className="form-group">
                <label>Número do cartão</label>
                <input
                  type="text"
                  id="card-number"
                  placeholder="0000 0000 0000 0000"
                  value={formFields["card-number"]}
                  onChange={(e) => handleFieldChange("card-number", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Número de telefone</label>
                <input
                  type="text"
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={formFields["phone"]}
                  onChange={(e) => handleFieldChange("phone", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Data de validade</label>
                <input
                  type="text"
                  id="card-exp"
                  placeholder="MM/AAAA"
                  value={formFields["card-exp"]}
                  onChange={(e) => handleFieldChange("card-exp", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Nome no cartão</label>
                <input
                  type="text"
                  id="card-name"
                  placeholder="Nome como está no cartão"
                  value={formFields["card-name"]}
                  onChange={(e) => handleFieldChange("card-name", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Código de segurança (CVV)</label>
                <input
                  type="text"
                  id="card-cvv"
                  placeholder="000"
                  maxLength={4}
                  value={formFields["card-cvv"]}
                  onChange={(e) => handleFieldChange("card-cvv", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <input
                  type="text"
                  id="address"
                  placeholder="Rua, número, cidade"
                  value={formFields["address"]}
                  onChange={(e) => handleFieldChange("address", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>CPF</label>
                <input
                  type="text"
                  id="cpf"
                  placeholder="000.000.000-00"
                  value={formFields["cpf"]}
                  onChange={(e) => handleFieldChange("cpf", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Complemento</label>
                <input
                  type="text"
                  id="complement"
                  placeholder="Apto, bloco, etc (opcional)"
                  value={formFields["complement"]}
                  onChange={(e) => handleFieldChange("complement", e.target.value)}
                />
              </div>

              {userEmail && paymentMethod !== "pix" && (
                <div className="form-group save-card-group">
                  <button
                    type="button"
                    className="btn-save-card"
                    onClick={saveCard}
                    disabled={!formFields["card-number"] || !formFields["card-name"] || !formFields["card-exp"]}
                  >
                    💾 Salvar este cartão
                  </button>
                </div>
              )}
            </div>

            <div className="checkout-actions">
              <button
                type="button"
                id="pixProceedBtn"
                className={`btn-comprar ${paymentMethod === "pix" ? "" : "hidden"}`}
                onClick={handlePixProceed}
                disabled={!isFormValid()}
                style={{ opacity: !isFormValid() ? 0.5 : 1, cursor: !isFormValid() ? "not-allowed" : "pointer" }}
              >
                Prosseguir com a compra
              </button>
              <button
                type="submit"
                id="confirmBuy"
                className={`btn-comprar ${paymentMethod === "pix" ? "hidden" : ""}`}
                disabled={!isFormValid()}
                style={{ opacity: !isFormValid() ? 0.5 : 1, cursor: !isFormValid() ? "not-allowed" : "pointer" }}
              >
                Comprar
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          © 2025 SensorLink - Todos os direitos reservados
          <div className="contact">+55 48 XXXXX-XX</div>
        </div>
      </footer>
      <script src="/chat.js"></script>
    </>
  )
}
