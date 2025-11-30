"use client"

import { useState, useEffect } from "react"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [showCopyNotification, setShowCopyNotification] = useState(false)

  const slides = [
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop",
    "/motherboard.jpg", // replaced random image with Arduino motherboard image
  ]

  const reviews = [
    {
      initial: "M",
      name: "Maria Santos",
      text: "Excelente produto! O SensorLink transformou minha casa. A automação funciona perfeitamente e o app é muito intuitivo. Já economizei bastante com a energia. Recomendo!",
      rating: 5,
    },
    {
      initial: "J",
      name: "João Silva",
      text: "Muito bom, superou minhas expectativas. A detecção de movimento é precisa e a instalação foi fácil. Só gostaria que tivesse mais opções de customização no app.",
      rating: 4.5,
    },
    {
      initial: "A",
      name: "Ana Costa",
      text: "Adquiri o SensorLink há 3 meses e não consigo mais viver sem ele! Praticamente não me preocupo mais com deixar luzes acesas. Muito eficiente mesmo!",
      rating: 4,
    },
    {
      initial: "C",
      name: "Carlos Oliveira",
      text: "Bom custo-benefício. O produto é confiável e o suporte responde rápido. Algumas atualizações do app deixariam ainda melhor, mas no geral estou satisfeito.",
      rating: 3.5,
    },
    {
      initial: "L",
      name: "Lucas Pereira",
      text: "Fantástico! Instalei em todos os cômodos e a economia de energia foi notável. O relatório semanal ajuda a acompanhar o consumo. Muito recomendado!",
      rating: 5,
    },
    {
      initial: "F",
      name: "Fernanda Dias",
      text: "Ótimo produto com ótimo custo. Atendimento excelente da equipe. A qualidade é notável e funciona sem problemas. Meu voto é 5 estrelas!",
      rating: 4,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "✯"}
        {"☆".repeat(emptyStars)}
        <span style={{ marginLeft: "8px" }}>{rating}</span>
      </>
    )
  }

  const handleEmailClick = async () => {
    try {
      await navigator.clipboard.writeText("nebif42544@besenica.com")
      setShowCopyNotification(true)
      setTimeout(() => setShowCopyNotification(false), 3000)
    } catch (err) {
      alert("Erro ao copiar email")
    }
  }

  const handleYouTubeClick = () => {
    window.open("https://www.youtube.com/watch?v=sv9dDtYnE1g", "_blank")
  }

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/manualdomundo/?hl=pt-br", "_blank")
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
        {/* CARROSSEL */}
        <section className="hero">
          <div className="carousel">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`slide ${idx === currentSlide ? "active" : ""}`}
                style={{ display: idx === currentSlide ? "block" : "none" }}
              >
                <img src={slide || "/placeholder.svg"} alt="banner" />
              </div>
            ))}
            <button
              className="carousel-prev"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              aria-label="anterior"
            >
              ‹
            </button>
            <button
              className="carousel-next"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              aria-label="próximo"
            >
              ›
            </button>
          </div>
        </section>

        {/* SOBRE NÓS */}
        <section className="container about-section">
          <div className="about-left">
            <h2>Sobre nós:</h2>
            <p>
              O objetivo do SensorLink é trazer mais autonomia e conforto ao cliente em seu cotidiano. Ele é um sistema
              que se integra com a rede de wifi da residência e foi construído pelo sistema Arduino. Para uso mais
              eficiente do sistema foi elaborado o aplicativo "SensorLink".
            </p>
            <div className="socials">
              <button onClick={handleYouTubeClick} title="YouTube" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <button onClick={handleInstagramClick} title="Instagram" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <circle cx="17.5" cy="6.5" r="1.5" />
                </svg>
              </button>
              <a href="https://wa.me/" title="WhatsApp" className="social-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.781 1.158l-.335.17-3.468-.923.942 3.26-.216.338a9.9 9.9 0 00-1.51 5.26c.001 5.45 4.436 9.884 9.888 9.884A9.87 9.87 0 0021.6 13.176c0-5.452-4.436-9.884-9.888-9.884" />
                </svg>
              </a>
              <button onClick={handleEmailClick} title="Email" className="social-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </button>
            </div>
          </div>
          <div className="about-right">
            <img src="https://picsum.photos/300/200?random=3" alt="produto" />
            <div className="product-prices">
              <div className="price-label">Até 6x de: R$42.90</div>
              <div className="price-big">R$240,00</div>
            </div>
          </div>
        </section>

        {/* AVALIAÇÕES E PERGUNTAS FREQUENTES */}
        <section className="container reviews-faq-section">
          <div className="reviews">
            <h3>Avaliações</h3>
            <div className="review-carousel">
              <button
                className="review-prev"
                onClick={() => setReviewIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
              >
                ‹
              </button>
              <div className="review-card">
                <div className="avatar">{reviews[reviewIndex].initial}</div>
                <div>
                  <p>
                    <strong>{reviews[reviewIndex].name}</strong>
                  </p>
                  <p>{reviews[reviewIndex].text}</p>
                  <div className="stars">{renderStars(reviews[reviewIndex].rating)}</div>
                </div>
              </div>
              <button className="review-next" onClick={() => setReviewIndex((prev) => (prev + 1) % reviews.length)}>
                ›
              </button>
            </div>
          </div>
          <div className="faq">
            <h3>Perguntas frequentes</h3>
            <button className="faq-btn" onClick={() => alert("Muito fácil!")}>
              É SIMPLES DE INSTALAR? ›
            </button>
            <button className="faq-btn" onClick={() => alert("Resposta: Sim! Funciona.")}>
              FUNCIONA OU NAO? ›
            </button>
            <button className="faq-btn" onClick={() => alert("Muito.")}>
              VALE A PENA? ›
            </button>
          </div>
        </section>
      </main>

      {showCopyNotification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#2AB3EA",
            color: "#FFFFFF",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(42, 179, 234, 0.3)",
            zIndex: 9999,
            animation: "slideIn 0.3s ease-out",
          }}
        >
          Email copiado com sucesso! (nebif42544@besenica.com)
        </div>
      )}

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
