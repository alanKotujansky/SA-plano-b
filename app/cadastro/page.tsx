"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Cadastro() {
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleRegister = async () => {
    const name = (document.getElementById("reg-name") as HTMLInputElement).value
    const emailOrPhone = (document.getElementById("reg-email") as HTMLInputElement).value
    const password = (document.getElementById("reg-pass") as HTMLInputElement).value
    const confirmPassword = (document.getElementById("reg-pass2") as HTMLInputElement).value

    // Validações
    if (!name || !emailOrPhone || !password || !confirmPassword) {
      showError("Preencha todos os campos")
      return
    }

    if (password !== confirmPassword) {
      showError("As senhas não coincidem")
      return
    }

    if (password.length < 6) {
      showError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    try {
      // Verificar se é email ou telefone
      const isEmail = emailOrPhone.includes("@")

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: isEmail ? emailOrPhone : `${emailOrPhone}@placeholder.com`,
        password: password,
      })

      if (authError) {
        showError(authError.message)
        return
      }

      // Salvar dados adicionais na tabela profiles
      if (authData.user) {
        const { error: profileError } = await supabase.from("profiles").insert({
          id: authData.user.id,
          name: name,
          email_or_phone: emailOrPhone,
        })

        if (profileError) {
          console.error("[v0] Erro ao salvar perfil:", profileError)
        }
      }

      // Mostrar popup de sucesso
      setNotificationMessage("Cadastro realizado com sucesso!")
      setIsError(false)
      setShowNotification(true)

      setTimeout(() => {
        setShowNotification(false)
        router.push("/login")
      }, 2000)
    } catch (error: any) {
      showError(error.message || "Erro ao cadastrar")
    }
  }

  const showError = (message: string) => {
    setNotificationMessage(message)
    setIsError(true)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <>
      {showNotification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: isError ? "#d9534f" : "#2AB3EA",
            color: "white",
            padding: "16px 24px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            zIndex: 9999,
            fontWeight: 600,
            animation: "slideIn 0.3s ease",
          }}
        >
          {notificationMessage}
        </div>
      )}

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
        <section className="auth-page">
          <div className="auth-card register">
            <h2>Cadastro</h2>
            <p className="sub">Realize seu cadastro</p>
            <form id="registerForm" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Nome" id="reg-name" type="text" required />
              <input placeholder="Email ou Telefone" id="reg-email" type="text" required />
              <input placeholder="Senha" id="reg-pass" type="password" required />
              <input placeholder="Confirmar Senha" id="reg-pass2" type="password" required />
              <button type="button" className="btn-primary" onClick={handleRegister}>
                Cadastrar
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          © 2025 SensorLink - Todos os direitos reservados
          <div className="contact">+55 48 XXXXX-XX</div>
        </div>
      </footer>
    </>
  )
}
