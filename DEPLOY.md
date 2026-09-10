# Deploy

## Visão geral

Este projeto usa duas partes distintas:

- Frontend: build do Vite gerando a pasta `dist`
- Backend: servidor Node em `server.mjs` para as rotas do Mercado Pago

Arquitetura atual:

- Frontend: `npm run build`
- Backend: `npm run api`
- Build esperado: `dist`
- API esperada: `http://localhost:3001` no ambiente local

> Importante: este repositório não possui uma API serverless do Vercel. O backend está em `server.mjs` e precisa rodar em um serviço Node separado ou no mesmo servidor que hospeda a aplicação.

## Variáveis de ambiente

Use o arquivo [.env.example](.env.example) como base.

### Local

```env
# Instagram e Facebook (públicas no frontend)
VITE_FACEBOOK_APP_ID=sua_facebook_app_id_aqui
VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID=seu_instagram_business_account_id_aqui
VITE_INSTAGRAM_ACCESS_TOKEN=seu_instagram_access_token_aqui
VITE_API_BASE_URL=http://localhost:3001

# Mercado Pago (servidor apenas)
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxxxxxxxxxxxxxx
PUBLIC_URL=http://localhost:8443
API_PORT=3001
ALLOWED_ORIGIN=http://localhost:8443
MERCADOPAGO_NOTIFICATION_URL=http://localhost:3001/api/mercadopago/webhook
```

### Produção

No ambiente de produção, configure estas variáveis no serviço que vai rodar o backend:

```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxxxxxxxxxxxxxx
PUBLIC_URL=https://seu-dominio.com
API_PORT=3001
ALLOWED_ORIGIN=https://seu-dominio.com
MERCADOPAGO_NOTIFICATION_URL=https://seu-backend-url/api/mercadopago/webhook
```

No Vercel, adicione também:

```env
VITE_API_BASE_URL=https://seu-backend-url
```

## Opções de deploy

### 1) Frontend em Vercel + backend em Render/Railway/VM

- Publicar o frontend em Vercel usando `npm run build` com output `dist`
- Publicar o backend em Render, Railway, Fly.io ou uma VM Linux
- Garantir que o frontend chame o backend via URL pública do serviço Node
- Se estiver rodando frontend e backend no mesmo domínio, configure um proxy/rewrite para `/api/*`

### 2) Frontend + backend na mesma máquina

- Rode `npm run build` para gerar `dist`
- Rode `npm run api` para iniciar o servidor Node
- Sirva `dist` com Nginx ou outro servidor web
- Exponha `3001` para a API do Mercado Pago

## Deploy passo a passo

### Frontend

1. Faça login na Vercel.
2. Clique em `Add New Project`.
3. Conecte este repositório.
4. Configure:
   - Framework Preset: `Vite`
   - Root Directory: `.`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Salve e faça o deploy.

### Backend

1. Configure o ambiente com as variáveis do Mercado Pago.
2. Inicie o serviço com:

```bash
npm install
npm run api
```

3. Exponha a porta configurada em `API_PORT`.

## Rotas disponíveis

- `POST /api/mercadopago/preference`
- `POST /api/mercadopago/webhook`
- `GET /api/mercadopago/status?externalReference=...`
- `GET /api/mercadopago/status?paymentId=...`

## Observações importantes

- `MERCADOPAGO_ACCESS_TOKEN` deve ficar apenas no ambiente do servidor. Nunca use prefixo `VITE_` para esse valor.
- `PUBLIC_URL` deve apontar para a URL pública do frontend e deve refletir o domínio real da aplicação.
- `MERCADOPAGO_NOTIFICATION_URL` é opcional, mas recomendado para receber webhooks do Mercado Pago.
- O frontend atual usa `/api/...` no mesmo domínio, então em produção é necessário que essa rota seja servida pelo backend ou por um proxy.

## Verificação

Antes do deploy, valide localmente com:

```bash
npm run build
node --check server.mjs
```

Este projeto já foi validado usando os comandos acima.
