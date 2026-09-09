# Mercado Pago

A loja usa o Checkout Pro. O frontend envia apenas IDs e quantidades para `/api/mercadopago/preference`; o servidor valida os produtos e cria a preferência usando o Access Token privado.

## Desenvolvimento

1. Copie `.env.example` para `.env` e preencha `MERCADOPAGO_ACCESS_TOKEN`.
2. Abra dois terminais na pasta do projeto:

```bash
npm run api
npm run dev
```

O Vite encaminha `/api` para `http://localhost:3001`.

## Produção

Execute `server.mjs` junto com o frontend ou publique o endpoint em uma função/server backend. Defina `PUBLIC_URL` com a URL HTTPS real da loja. O Access Token deve existir apenas nas variáveis de ambiente do servidor, nunca em `VITE_*` nem no código do navegador.

O endpoint de notificações ainda precisa ser implementado no backend caso você queira atualizar pedidos automaticamente após o pagamento. Para testes, use credenciais e compradores de teste do Mercado Pago.
