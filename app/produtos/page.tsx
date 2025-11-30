"use client"

export default function Produtos() {
  const products = [
    {
      name: "SensorLink",
      desc: "FAZ TUDO PRA VC LIGA LUZ E DESLIGA SELOCO",
      price1: "R$240,00 à vista",
      price2: "R$42,90 em até 6x",
    },
  ]

  const addToCart = (productName: string) => {
    const cart = JSON.parse(localStorage.getItem("sl_cart") || "[]")
    cart.push({ name: productName, date: new Date().toISOString() })
    localStorage.setItem("sl_cart", JSON.stringify(cart))
    const badge = document.getElementById("cartBadge")
    if (badge) badge.textContent = cart.length.toString()
  }

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="logo">
            Sensor<span>Link</span>
          </div>
          <nav className="main-nav">
            <a className="nav-link" href="/" title="Início">
              🏠 Início
            </a>
            <a className="nav-link" href="/produtos" title="Produtos">
              🛒 Produtos
            </a>
            <div className="nav-cart-container">
              <a className="nav-link" href="/checkout" title="Carrinho">
                🛒 Carrinho
              </a>
              <span className="cart-badge" id="cartBadge">
                0
              </span>
            </div>
            <a className="nav-link" href="/login" title="Entrar">
              👤 Entrar
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="container products-page">
          <div className="products-grid products-grid-single">
            {products.map((product, idx) => (
              <div key={idx} className="product-item">
                <h3>{product.name}</h3>
                <div className="product-image">
                  <img
                    src="/arduino.png"
                    alt="Arduino SensorLink"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                  />
                </div>
                <p className="product-desc">{product.desc}</p>
                <div className="product-prices">
                  <div className="price-line">{product.price1}</div>
                  <div className="price-line">{product.price2}</div>
                </div>
                <button onClick={() => addToCart(product.name)} className="btn-comprar">
                  Comprar
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          © 2025 SensorLink - Todos os direitos reservados
          <div className="contact">+55 48 XXXXX-XX</div>
        </div>
      </footer>
      <script src="/main.js"></script>
      <script src="/chat.js"></script>
    </>
  )
}
