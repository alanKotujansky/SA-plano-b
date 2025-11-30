'use client'

export function Features() {
  const features = [
    {
      title: 'Sensor de Movimento',
      description: 'Detecta presença e controla automáticamente iluminação e aparelhos eletrônicos em tempo real.',
      icon: '👁️'
    },
    {
      title: 'Sensor de Aproximação',
      description: 'Ativa dispositivos antes mesmo de você chegar ao ambiente, oferecendo máximo conforto.',
      icon: '🔄'
    },
    {
      title: 'Controle Remoto',
      description: 'Ligue e desligue luz e eletrônicos de qualquer lugar através do aplicativo.',
      icon: '📱'
    },
    {
      title: 'Configuração Inteligente',
      description: 'Personalize quais aparelhos ativar, tempo de resposta e tempo de desligamento automático.',
      icon: '⚙️'
    },
    {
      title: 'Relatório de Consumo',
      description: 'Acompanhe a energia consumida com relatórios detalhados atualizados a cada 5 minutos.',
      icon: '📊'
    },
    {
      title: 'Metas de Eficiência',
      description: 'Defina metas diárias, semanais e mensais. Receba notificações para otimizar seu consumo.',
      icon: '🎯'
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Recursos Principais</h2>
          <p className="text-lg text-muted-foreground">Tudo que você precisa para uma casa inteligente</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
