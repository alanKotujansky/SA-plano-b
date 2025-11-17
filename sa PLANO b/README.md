# SensorLink - Site Completo

## 📋 Descrição
Site responsivo para a marca **SensorLink** com páginas de home, produtos, login, cadastro e checkout. Desenvolvido com **HTML5, CSS3 e JavaScript vanilla**.

## 📁 Estrutura do Projeto

```
sa PLANO b/
├── index.html           # Página inicial (home)
├── products.html        # Página de produtos (3 itens)
├── login.html           # Página de login
├── register.html        # Página de cadastro
├── checkout.html        # Página de checkout/pagamento
├── styles.css           # Estilos globais
├── main.js              # JavaScript (carrossel, validações, localStorage)
├── README.md            # Este arquivo
```

## 🚀 Como Usar

### 1. Abrir o Site Localmente
- Simplesmente abra o arquivo `index.html` no navegador (duplo clique ou drag & drop)
- Não precisa de servidor web, funciona offline

### 2. Navegar entre Páginas
Use a navegação no topo em todas as páginas:
- **🏠 Início** → Página inicial com carrossel, sobre e avaliações
- **🛒 Produtos** → Grade com 3 produtos (SensorLink, Pro, Premium)
- **👤 Entrar** → Login (com redirecionamento para cadastro)

### 3. Funcionalidades Implementadas

#### 📱 Página Inicial (index.html)
- Carrossel de banners (muda automático a cada 5 segundos)
- Seção "Sobre nós" com ícones sociais
- Seção de avaliações
- Perguntas frequentes
- Footer com contato

#### 🛍️ Página de Produtos (products.html)
- Grid responsivo com 3 produtos
- Cada produto tem: imagem, título, descrição, preços (à vista e parcelado)
- Botão "Comprar" → leva ao checkout

#### 🔐 Login (login.html)
- Campo email/telefone e senha
- Verifica credenciais no `localStorage` (banco de dados local)
- Link "Cadastre-se já!" → vai para register.html
- Após login bem-sucedido → redireciona para home

#### 📝 Cadastro (register.html)
- Campos: Nome, Email/Telefone, Senha, Confirmar Senha
- Validações: campos obrigatórios, senhas conferem
- Salva novo usuário no `localStorage`
- Após cadastro → redireciona para login

#### 💳 Checkout (checkout.html)
- Seleção de forma de pagamento (Pix, Crédito, Débito)
- Formulário com dados pessoais e de pagamento
- Botão "Comprar" simula conclusão da compra
- Após compra → volta para home

## 💾 Dados Armazenados

O sistema usa **localStorage do navegador** para guardar:
- Usuários cadastrados (email, nome, senha)
- Usuário logado atual

**Exemplo de usuário para teste:**
```
Email: alan@test.com
Senha: 123
Nome: Alan
```

Você pode criar novos usuários na página de cadastro.

## 📐 Paleta de Cores
- **Azul claro**: #2AB3EA
- **Azul teal**: #3095AB
- **Azul escuro**: #073A79
- **Branco**: #FFFFFF
- **Preto**: #000000

## 📱 Responsividade
O site é responsivo para:
- Desktop (1024px+)
- Tablet (640px - 1024px)
- Mobile (até 640px)

## 🔧 Tecnologias Usadas
- **HTML5** - Estrutura semântica
- **CSS3** - Layout flexbox/grid, gradientes, media queries
- **JavaScript Vanilla** - Eventos, localStorage, validações
- **Google Fonts** - Tipografia "Poppins"

## ⚡ Recursos Não Implementados (para versão futura)
- Backend/API para cadastro e login real
- Integração com gateway de pagamento (Stripe, PayPal)
- Upload de imagens de produtos
- Sistema de avaliações reais
- Carrinho de compras persistente
- Email de confirmação

## 📞 Contato
- Telefone: +55 48 XXXXX-XX
- © 2025 SensorLink - Todos os direitos reservados

## 🎯 Próximos Passos (Sugestões)
1. Conectar a um backend real (Node.js, PHP, etc)
2. Implementar autenticação segura (JWT, OAuth)
3. Integração com banco de dados (MongoDB, MySQL)
4. Adicionar carrossel de avaliações funcionando
5. Sistema de carrinho de compras
6. Notificações por email
7. Dashboard de administrador

---

**Versão:** 1.0  
**Data:** 17 de Novembro de 2025  
**Status:** ✅ Pronto para uso
