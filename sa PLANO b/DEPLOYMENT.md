# 🚀 Guia de Deploy - SensorLink

## Opção 1: Deploy Gratuito (Recomendado)

### Netlify (Mais fácil)
1. Acesse [netlify.com](https://netlify.com)
2. Faça login com GitHub/Google
3. Clique em "Add new site" → "Deploy manually"
4. Arraste a pasta `sa PLANO b` inteira
5. Pronto! Seu site estará no ar em `xxxxx.netlify.app`

### GitHub Pages
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Vá em Settings → Pages
4. Selecione "main" branch como source
5. Seu site ficará em `seuusuario.github.io/repositorio`

### Vercel
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Import Project"
3. Selecione o repositório GitHub
4. Deploy automático em cada push!

## Opção 2: Servidor Próprio

### Com Apache/cPanel
1. Compacte a pasta em ZIP
2. Acesse o cPanel do seu hosting
3. Vá em "File Manager"
4. Extraia o ZIP na pasta `public_html`
5. Acesse seu domínio!

### Com Node.js (Local ou VPS)
```bash
# Instale um servidor HTTP simples
npm install -g http-server

# Na pasta do projeto, execute:
http-server

# Acesse em: http://localhost:8080
```

## Opção 3: Servidor FTP

1. Conecte via FTP (FileZilla, WinSCP)
2. Upload dos arquivos para `public_html` ou `www`
3. Acesse seu domínio

## Checklist Pré-Deploy

- [ ] Verificar todos os links funcionam
- [ ] Testar responsividade (mobile, tablet, desktop)
- [ ] Checar compatibilidade em Chrome, Firefox, Safari, Edge
- [ ] Verificar console do navegador (sem erros)
- [ ] Testar cadastro e login
- [ ] Validar formulários

## URLs após Deploy

Seu site estará em:
- **Netlify**: `meuprojeto.netlify.app`
- **GitHub Pages**: `meuusuario.github.io/sensorlink`
- **Vercel**: `sensorlink.vercel.app`
- **Domínio próprio**: `www.sensorlink.com.br`

## Atualizações Futuras

Para versão com backend:
1. Usar Node.js + Express
2. Banco de dados: MongoDB ou MySQL
3. Deploy em Heroku, Railway ou DigitalOcean

---

**Dúvidas?** Consulte a documentação das plataformas.
