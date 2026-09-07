# 📸 Configuração do Instagram para Perfume Gift Shop

Esta aplicação está totalmente configurada para integração com Instagram e Facebook! Aqui está como ativar todos os recursos.

## ✨ Recursos Implementados

- ✅ **Meta tags Open Graph** - Compartilhamento otimizado em redes sociais
- ✅ **Botão de Compartilhamento no Instagram** - Compartilhe produtos direto para o feed
- ✅ **Compartilhamento por WhatsApp** - Envie produtos para amigos via WhatsApp
- ✅ **Login com Instagram/Facebook** - Autentique usuários com suas contas
- ✅ **Feed do Instagram integrado** - Exiba suas últimas postagens no app
- ✅ **Botão Seguir** - Link direto para seguir seu perfil

## 🚀 Como Configurar

### Página do Facebook

A loja já está vinculada ao botão da Página oficial:
`https://www.facebook.com/profile.php?id=61560592764585`

Para exibir a loja como uma **aba dentro da Página**, a aplicação precisa estar publicada em HTTPS e um app precisa ser criado no Meta for Developers com o produto **Page Tab**. Use estes valores na configuração:

- **Page Tab Name:** Carol Presentes
- **Secure Page Tab URL:** `https://carolpresentes.vercel.app/`
- **Page Tab URL:** `https://carolpresentes.vercel.app/`
- **Facebook Page:** a Página com ID `61560592764585`

Depois, associe a aba à Página pelo painel do app. O App ID da Meta ainda precisa ser colocado nas variáveis de ambiente antes de ativar recursos autenticados do SDK.

### 1. Criar Aplicação no Facebook Developer

1. Acesse [https://developers.facebook.com/](https://developers.facebook.com/)
2. Clique em "Meus Apps" → "Criar App"
3. Escolha "Consumidor" como tipo de app
4. Preencha os detalhes:
   - **Nome do App:** Perfume Gift Shop
   - **Email:** seu_email@exemplo.com
   - **Tipo:** Comercial

### 2. Configurar Facebook Login

1. No painel do seu app, clique em "Adicionar Produto"
2. Procure por "Facebook Login" e clique em "Configurar"
3. Escolha "Web"
4. Na seção "URIs válidos do OAuth Redirect", adicione:
   - `http://localhost:5173` (desenvolvimento)
   - `https://seu-dominio.com` (produção)

### 3. Obter Facebook App ID

1. Vá para "Configurações" → "Básico"
2. Copie o **ID do App**
3. Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_FACEBOOK_APP_ID=seu_id_aqui
```

### 4. Configurar Instagram Business Account (Opcional)

Para exibir seu feed do Instagram no app:

1. Conecte sua conta Instagram ao seu Business Manager
2. Vá para "Business Settings" → "Instagram Accounts"
3. Encontre seu Instagram Business Account ID
4. Gere um Access Token:
   - Tools → Graph API Explorer
   - Selecione seu app
   - Permissões: `instagram_basic,instagram_graph_user_media`
   - Gere o token

5. Adicione ao `.env`:

```env
REACT_APP_INSTAGRAM_BUSINESS_ACCOUNT_ID=seu_id_aqui
REACT_APP_INSTAGRAM_ACCESS_TOKEN=seu_token_aqui
```

### 5. Configurar URLs Meta Tags

No arquivo `index.html`, atualize:

```html
<meta property="og:image" content="URL_DA_SUA_IMAGEM_DESTACADA" />
<meta property="og:url" content="https://seu-dominio.com" />
<meta property="fb:app_id" content="SEU_FACEBOOK_APP_ID" />
```

## 🎨 Componentes Disponíveis

### InstagramShare
Compartilhamento em Instagram e WhatsApp:
```tsx
import InstagramShare from './components/InstagramShare'

<InstagramShare product={product} />
```

### FollowButton
Botão para seguir seu perfil:
```tsx
import FollowButton from './components/FollowButton'

<FollowButton username="carolpresentesindaiatuba" variant="primary" />
```

### InstagramLogin
Autenticação via Facebook/Instagram:
```tsx
import InstagramLogin from './components/InstagramLogin'

<InstagramLogin 
  onSuccess={(userData) => console.log(userData)}
  onError={(error) => console.error(error)}
/>
```

### InstagramFeed
Exibir seus posts do Instagram:
```tsx
import InstagramFeed from './components/InstagramFeed'

<InstagramFeed userId="seu_id" accessToken="seu_token" limit={6} />
```

## 🔐 Segurança

⚠️ **IMPORTANTE:** 
- Nunca compartilhe seu Access Token publicamente
- Use variáveis de ambiente (`.env`)
- O arquivo `.env` não deve ser commitado no Git
- Para produção, use um backend seguro para armazenar tokens

## 🧪 Testando Localmente

1. Instale as dependências:
```bash
pnpm install
```

2. Crie o arquivo `.env`:
```bash
cp .env.example .env
# Edite .env e adicione suas credenciais
```

3. Inicie o servidor:
```bash
pnpm dev
```

4. Acesse `http://localhost:5173`

## 📱 Recursos do Instagram

### Compartilhamento de Produtos
Quando um usuário clica em "Compartilhar" em um produto:
- Abre dialog nativo do Instagram
- Inclui descrição personalizada
- Adiciona hashtags automáticas
- Link para o produto

### WhatsApp
- Botão direto para enviar mensagem
- Pré-preenchida com detalhes do produto
- Número configurável em `src/config/instagram.ts`

### Feed Automático
- Puxa posts do seu Instagram Business Account
- Atualiza automaticamente
- Clique para abrir no Instagram

### Login Social
- Autentique usuários com contas Facebook/Instagram
- Acesse dados do perfil (nome, foto, email)
- Salve preferências por usuário

## 🐛 Troubleshooting

### "Facebook SDK is not loaded"
- Verifique se o `FACEBOOK_APP_ID` está correto
- Certifique-se de que as URLs estão whitelisted

### Compartilhamento não funciona
- Teste no localhost com HTTP (o Facebook pede isso)
- Em produção, use HTTPS

### Feed não carrega
- Verifique o Access Token - pode estar expirado
- Permissões podem estar faltando
- Teste no Graph API Explorer do Facebook

## 📚 Documentação Oficial

- [Facebook Developers](https://developers.facebook.com/)
- [Instagram Graph API](https://developers.facebook.com/docs/instagram-api)
- [Facebook Share Dialog](https://developers.facebook.com/docs/sharing/web)
- [Facebook Login](https://developers.facebook.com/docs/facebook-login/web)

## 💡 Dicas

1. **Primeiros passos:** Configure apenas o Facebook App ID primeiro
2. **Teste tudo:** Use o Graph API Explorer para testar chamadas
3. **Imagens:** Otimize imagens para 1.91:1 aspect ratio (Instagram)
4. **Hashtags:** Use até 5 hashtags relevantes no compartilhamento
5. **Frequência:** Não compartilhe muitos produtos de uma vez

---

**Dúvidas?** Consulte a documentação oficial do Facebook Developers ou abra uma issue no repositório.
