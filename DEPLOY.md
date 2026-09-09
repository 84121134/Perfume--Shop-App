# Deploy na Vercel

## Visão geral

Este projeto já está preparado para funcionar na Vercel com Vercel Functions para o backend do Mercado Pago.

- Frontend: Vite app
- Backend: `api/mercadopago/[...slug].js`
- Build esperado: `npm run build`
- Output esperado: `dist`

## Variáveis de ambiente

Use o arquivo [.env.example](.env.example) como base para o ambiente local.

### Local

```env
# Instagram e Facebook Configuration
VITE_FACEBOOK_APP_ID=sua_facebook_app_id_aqui
VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID=seu_instagram_business_account_id_aqui
VITE_INSTAGRAM_ACCESS_TOKEN=seu_instagram_access_token_aqui

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxxxxxxxxxxxxxxxxxx
PUBLIC_URL=http://localhost:8443
API_PORT=3001
ALLOWED_ORIGIN=http://localhost:8443
```

### Vercel

Configure no painel do projeto da Vercel:

```env
MERCADOPAGO_ACCESS_TOKEN=APP_USR-xxxxxxxxxxxxxxxxxxxxxxxx
PUBLIC_URL=https://seu-projeto.vercel.app
ALLOWED_ORIGIN=https://seu-projeto.vercel.app
MERCADOPAGO_NOTIFICATION_URL=https://seu-projeto.vercel.app/api/mercadopago/webhook
```

## Deploy passo a passo

1. Faça login na Vercel.
2. Clique em `Add New Project`.
3. Conecte este repositório do GitHub.
4. Configure:
   - Framework Preset: `Vite`
   - Root Directory: `.`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Vá em `Settings` → `Environment Variables`.
6. Adicione as variáveis acima.
7. Salve e faça o deploy.

## Observações importantes

- `MERCADOPAGO_ACCESS_TOKEN` deve ser mantido apenas no ambiente do servidor. Nunca use prefixo `VITE_` para este valor.
- `PUBLIC_URL` deve apontar para a URL HTTPS real da sua aplicação na Vercel.
- `MERCADOPAGO_NOTIFICATION_URL` é opcional, mas recomendado se você quiser receber webhooks do Mercado Pago.
- O endpoint do backend fica em `/api/mercadopago/preference`.

## Rotas disponíveis

- `/api/mercadopago/preference`
- `/api/mercadopago/webhook`
- `/api/mercadopago/status`

## Verificação

Antes do deploy, pode validar localmente com:

```bash
npm run build
```

Este projeto já foi validado com sucesso usando o comando acima.
