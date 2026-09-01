# 🎁 Perfume Gift Shop - Configuração Instagram Pronta!

## ✨ O que foi configurado

Sua aplicação agora está **totalmente pronta** para o Instagram com os seguintes recursos:

### 🎯 Recursos Principais

1. **🔗 Meta Tags Open Graph** - Previews bonitos ao compartilhar em qualquer rede social
2. **📱 Compartilhamento no Instagram** - Botão para compartilhar produtos direto no feed
3. **💬 Integração WhatsApp** - Compartilhe produtos via mensagem
4. **👤 Login com Instagram/Facebook** - Autentique usuários
5. **📸 Feed do Instagram** - Exiba seus posts automaticamente
6. **❤️ Botão Seguir** - Link direto para seu perfil

## 🚀 Para Começar

### 1. **Instalar dependências** (já feito ✅)
```bash
npm install
```

### 2. **Iniciar o servidor de desenvolvimento**
```bash
npm run dev
```

### 3. **Acessar a aplicação**
- Local: `http://localhost:5173`
- A aplicação funcionará **imediatamente** com dados de demonstração

## 🔐 Configurar com suas credenciais (Opcional)

Se você quer integração real com seu Instagram Business Account:

### Passo 1: Facebook Developer Setup
1. Vá para [https://developers.facebook.com/](https://developers.facebook.com/)
2. Crie uma nova app
3. Configure "Facebook Login"
4. Copie seu **App ID**

### Passo 2: Criar arquivo `.env`
```bash
cp .env.example .env
```

Edite `.env` e adicione:
```env
REACT_APP_FACEBOOK_APP_ID=seu_app_id_aqui
```

### Passo 3: Atualizar URL no `index.html`
- Procure por `SEU_FACEBOOK_APP_ID` 
- Substitua pelo seu App ID

**Para instruções completas**, veja [INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md)

## 📱 Funcionalidades Disponíveis

### No Perfil
- ✅ Botão "Seguir no Instagram" (agora em destaque com cor rosa)
- ✅ Perfil Instagram integrado

### No Produto (Modal)
- ✅ **Botão Compartilhar no Instagram** - com cor #E1306C (rosa Instagram)
- ✅ **Botão Compartilhar via WhatsApp** - com cor #25D366 (verde WhatsApp)
- ✅ Adicionar ao carrinho
- ✅ Curtir

### Na Aba Feed
- ✅ Feed do Instagram com últimos posts
- ✅ Galeria de 6 imagens (modo demonstração)
- ✅ Clique para abrir no Instagram
- ✅ Botão "Ver mais no Instagram"

## 📁 Arquivos Criados

```
src/
├── hooks/
│   └── useInstagram.ts          # Hook com todas as funções do Instagram
├── components/
│   ├── InstagramShare.tsx       # Compartilhamento em Instagram/WhatsApp
│   ├── FollowButton.tsx         # Botão para seguir
│   ├── InstagramLogin.tsx       # Login com Facebook/Instagram
│   └── InstagramFeed.tsx        # Feed do Instagram
├── config/
│   └── instagram.ts             # Configurações do Instagram
├── App.tsx                      # (Atualizado com componentes)
└── index.css                    # (Atualizado se necessário)

├── INSTAGRAM_SETUP.md           # Guia de configuração completo
├── .env.example                 # Template de variáveis de ambiente
└── QUICK_START.md               # Este arquivo!
```

## 🎨 Cores Utilizadas

- **Instagram Pink:** `#E1306C`
- **WhatsApp Green:** `#25D366`
- **Tema da Loja:** `#c9956c`, `#f7e8e0`, `#2d2523`

## 🧪 Testar Compartilhamento

### Local (sem autenticação)
1. Clique em um produto
2. Clique em "Compartilhar"
3. Funcionará com URLs de demonstração

### Com suas credenciais
1. Configure `.env` com seu Facebook App ID
2. Compartilhamentos diretos com seus posts

## ⚡ Comandos Rápidos

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Formatar código
npm run format
```

## 🐛 Algo não funcionando?

### "Compartilhamento não funciona"
- Certifique-se de estar em `http://localhost` (não `127.0.0.1`)
- Configure o App ID no `index.html`

### "Feed não carrega"
- Feed usa dados de demonstração por padrão
- Para dados reais, configure as variáveis de ambiente

### "Botões de rede social não aparecem"
- Verifique se JavaScript está ativado
- Limpe o cache do navegador
- Recarregue a página

## 📚 Referências

- [Facebook Developers](https://developers.facebook.com/)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)

## 💡 Próximas Melhorias

Você pode adicionar:
- [ ] Autenticação com salva de preferências
- [ ] Carrinho de compras persistente
- [ ] Checkout integrado com PayPal/Stripe
- [ ] Notificações de promoções
- [ ] Sistema de reviews/comentários
- [ ] Busca por voz

## 🎯 Resumo

- ✅ Aplicação funcionando
- ✅ Compartilhamento pronto
- ✅ Meta tags configuradas
- ✅ Componentes integrados
- ✅ Guias de setup inclusos

**Está tudo pronto para usar! Basta rodar `npm run dev` e começar!** 🚀

---

Dúvidas? Consulte [INSTAGRAM_SETUP.md](./INSTAGRAM_SETUP.md) para o guia completo.
