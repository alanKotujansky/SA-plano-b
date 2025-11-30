'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
          Casa Inteligente, Energia Economizada
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Controle automaticamente a iluminação e eletrônicos com sensores de movimento. Monitore consumo de energia em tempo real e atinja suas metas de eficiência.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#signup">Começar Agora</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10">
            <Link href="#features">Saiba Mais</Link>
          </Button>
        </div>

        <div className="mt-16 pt-16 border-t border-border">
          <p className="text-sm text-muted-foreground mb-8">Confiado por usuários em todo Brasil</p>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Usuários Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">45%</div>
              <div className="text-sm text-muted-foreground">Economia Média</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
