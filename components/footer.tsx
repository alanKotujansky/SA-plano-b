'use client'

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/10 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">S</span>
              </div>
              <span className="font-bold">SensorLink</span>
            </div>
            <p className="text-sm text-muted-foreground">Automação residencial inteligente para sua casa.</p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Documentação</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contato</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacidade</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Termos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4">Conecte-se</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Instagram</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Twitter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 SensorLink. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
