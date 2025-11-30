"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleLogin = async () => {
    const emailOrPhone = (document.getElementById("login-email") as HTMLInputElement).value
    const password = (document.getElementById("login-pass") as HTMLInputElement).value

    // Validações
    if (!emailOrPhone || !password) {
      showError("Preencha todos os campos")
      return
    }

    try {
      const isEmail = emailOrPhone.includes("@")

      const { data, error } = await supabase.auth.signInWithPassword({
        email: isEmail ? emailOrPhone : `${emailOrPhone}@placeholder.com`,
        password: password,
      })

      if (error) {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("id")
          .eq("email_or_phone", emailOrPhone)
          .maybeSingle()

        if (!profile) {
          showError("Você não tem cadastro")
          return
        }

        showError("Email/telefone ou senha incorretos")
        return
      }

      // Mostrar popup de sucesso
      setNotificationMessage("Login realizado com sucesso!")
      setIsError(false)
      setShowNotification(true)

      setTimeout(() => {
        setShowNotification(false)
        router.push("/")
      }, 2000)
    } catch (error: any) {
      showError(error.message || "Erro ao fazer login")
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
            <a className="nav-link" href="/login" title="Entrar">
              👤 Entrar
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="auth-page">
          <div className="auth-card login">
            <h2>Login</h2>
            <p className="sub">Realize seu login</p>
            <form id="loginForm" onSubmit={(e) => e.preventDefault()}>
              <input placeholder="Email ou Telefone" id="login-email" type="text" required />
              <input placeholder="Senha" id="login-pass" type="password" required />
              <button type="button" className="btn-primary" onClick={handleLogin}>
                Login
              </button>
            </form>
            <p className="small">
              Não possui login?{" "}
              <a href="/cadastro" className="link-register">
                Cadastre-se já!
              </a>
            </p>
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
