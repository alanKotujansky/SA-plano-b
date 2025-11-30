'use client'

export function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Entre em Contato</h2>
          <p className="text-lg text-muted-foreground">Estamos aqui para ajudar e ouvir suas sugestões</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl p-8 border border-border text-center hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Email</h3>
            <a href="mailto:contato@sensorlink.com" className="text-primary hover:text-primary/80 transition-colors">
              contato@sensorlink.com
            </a>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border text-center hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Redes Sociais</h3>
            <div className="space-y-2">
              <a href="#" className="block text-primary hover:text-primary/80 transition-colors text-sm">
                Instagram @sensorlink
              </a>
              <a href="#" className="block text-primary hover:text-primary/80 transition-colors text-sm">
                LinkedIn /sensorlink
              </a>
            </div>
          </div>

          <div className="bg-card rounded-xl p-8 border border-border text-center hover:border-primary/50 transition-all hover:shadow-lg">
            <div className="text-4xl mb-4">📍</div>
            <h3 className="font-semibold text-lg text-foreground mb-2">Localização</h3>
            <p className="text-muted-foreground text-sm">
              São Paulo, Brasil
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 bg-primary/10 rounded-xl border border-primary/20 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-2">Sobre a SensorLink</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A SensorLink é uma empresa de tecnologia focada em criar soluções inovadoras de automação residencial que economizam energia e aumentam o conforto nas casas brasileiras.
          </p>
        </div>
      </div>
    </section>
  )
}
