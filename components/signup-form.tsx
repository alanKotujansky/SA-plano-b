'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function SignupForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section id="signup" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Comece Agora</h2>
          <p className="text-lg text-muted-foreground">Cadastre-se para receber atualizações e acesso prioritário ao aplicativo</p>
        </div>

        <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 border-border"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base"
            >
              {submitted ? 'Cadastro realizado!' : 'Cadastrar'}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              Não enviaremos spam. Você pode se desinscrever a qualquer momento.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
