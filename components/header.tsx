'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">S</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline">SensorLink</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </Link>
            <Link href="#benefits" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Benefícios
            </Link>
            <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </Link>
          </nav>

          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="#signup">Cadastre-se</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
