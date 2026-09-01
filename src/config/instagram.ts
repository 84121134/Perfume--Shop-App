// Configuração do Instagram e Facebook
// Substitua com seus valores reais

export const INSTAGRAM_CONFIG = {
  // ID da sua aplicação Facebook
  FACEBOOK_APP_ID: import.meta.env.VITE_FACEBOOK_APP_ID || 'SEU_FACEBOOK_APP_ID',
  
  // ID de usuário do Instagram Business/Creator (obtém via Graph API)
  INSTAGRAM_BUSINESS_ACCOUNT_ID: import.meta.env.VITE_INSTAGRAM_BUSINESS_ACCOUNT_ID || 'SEU_INSTAGRAM_BUSINESS_ACCOUNT_ID',
  
  // Token de acesso do Instagram (gerado no Facebook Developer)
  INSTAGRAM_ACCESS_TOKEN: import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN || 'SEU_ACCESS_TOKEN',
  
  // Nome de usuário da loja no Instagram
  INSTAGRAM_USERNAME: 'carolpresentesindaiatuba',
  
  // URL do perfil
  INSTAGRAM_PROFILE_URL: 'https://www.instagram.com/carolpresentesindaiatuba',
  
  // Número de WhatsApp (com código de país)
  WHATSAPP_NUMBER: '5519971455659',
}

// Como configurar:
// 1. Crie uma aplicação no https://developers.facebook.com/
// 2. Configure o Facebook Login em seus produtos
// 3. Obtenha seu FACEBOOK_APP_ID
// 4. Configure as variáveis de ambiente no seu .env
// 5. Para o Instagram Business Account:
//    - Conecte sua conta Instagram ao Facebook
//    - Obtenha o Business Account ID
//    - Gere um Access Token com as permissões necessárias
//
// Variáveis de ambiente (.env):
// REACT_APP_FACEBOOK_APP_ID=seu_app_id
// REACT_APP_INSTAGRAM_BUSINESS_ACCOUNT_ID=seu_business_account_id
// REACT_APP_INSTAGRAM_ACCESS_TOKEN=seu_access_token
