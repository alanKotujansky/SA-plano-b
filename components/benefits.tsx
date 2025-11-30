'use client'

export function Benefits() {
  return (
    <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">Por que SensorLink?</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A SensorLink oferece uma solução completa para automação residencial com foco em economia de energia e conforto.
            </p>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Economia de Energia</h3>
                  <p className="text-muted-foreground">Redução média de 45% no consumo mensal de eletricidade</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Máximo Conforto</h3>
                  <p className="text-muted-foreground">Controle automático mantém seu ambiente sempre do jeito que você gosta</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Fácil de Usar</h3>
                  <p className="text-muted-foreground">Interface intuitiva e configuração simples, mesmo para iniciantes</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Suporte 24/7</h3>
                  <p className="text-muted-foreground">Nossa equipe está sempre pronta para ajudá-lo com qualquer dúvida</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-sm text-muted-foreground mb-2">Status do Sistema</div>
                <div className="text-2xl font-bold text-primary">Operacional</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-sm text-muted-foreground mb-2">Sensores Conectados</div>
                <div className="text-2xl font-bold text-primary">2/2</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-sm text-muted-foreground mb-2">Consumo Hoje</div>
                <div className="text-2xl font-bold text-primary">2.4 kWh</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-sm text-muted-foreground mb-2">Meta Semanal</div>
                <div className="text-2xl font-bold text-primary">45% Economizado</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
