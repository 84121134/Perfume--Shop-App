// Hook para integração com Instagram e Facebook SDK
export const useInstagram = () => {
  // Inicializa o SDK do Facebook
  const initFacebookSDK = () => {
    if (typeof window !== 'undefined' && (window as any).FB) {
      (window as any).FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID || 'SEU_FACEBOOK_APP_ID',
        xfbml: true,
        version: 'v18.0'
      });
    }
  };

  // Compartilhar produto no Instagram
  const shareToInstagram = (product: {
    id: number;
    name: string;
    price: string;
    img: string;
    brand: string;
  }) => {
    if (typeof window !== 'undefined' && (window as any).FB) {
      (window as any).FB.ui({
        method: 'share',
        href: window.location.href,
        hashtag: '#PerfumeGiftShop #' + product.brand.replace(/\s+/g, ''),
        quote: `Olha que lindo! 😍 ${product.name} de ${product.brand} por ${product.price}. Clique e confira! 🌸 #PerfumeGiftShop`,
      }, function(response: any){});
    }
  };

  // Compartilhar via WhatsApp
  const shareToWhatsApp = (product: {
    name: string;
    price: string;
    brand: string;
  }) => {
    const message = encodeURIComponent(
      `Olá! Vi esse produto: ${product.name} de ${product.brand} por ${product.price}. Queria saber mais! 🌸`
    );
    window.open(`https://wa.me/5519971455659?text=${message}`, '_blank');
  };

  // Login com Facebook/Instagram
  const loginWithFacebook = async () => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && (window as any).FB) {
        (window as any).FB.login(function(response: any) {
          if (response.authResponse) {
            resolve(response.authResponse);
          } else {
            reject('Falha ao fazer login');
          }
        }, {scope: 'email,public_profile,instagram_basic'});
      }
    });
  };

  // Obter feed do Instagram
  const getInstagramFeed = async (accessToken: string, userId: string) => {
    try {
      const response = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`
      );
      return await response.json();
    } catch (error) {
      console.error('Erro ao obter feed:', error);
      return null;
    }
  };

  // Abrir perfil do Instagram
  const openInstagramProfile = (username: string = 'carolpresentesindaiatuba') => {
    window.open(`https://www.instagram.com/${username}`, '_blank');
  };

  return {
    initFacebookSDK,
    shareToInstagram,
    shareToWhatsApp,
    loginWithFacebook,
    getInstagramFeed,
    openInstagramProfile,
  };
};
export const PRODUCTS = [
  {
    id: 1,
    name: 'Eudora',
    brand: 'maracujá',
    price: 'R$ 29,90',
    img: 'https://plain-enam-prod-public.komododecks.com/202608/20/kZj3YpqPoBmPjagGsSZg/image.jpg',
    tag: 'Mais Vendido',
    liked: false,
  },
  {
    id: 2,
    name: 'Natura',
    brand: 'Especiarias',
    price: 'R$ 134,90',
    img: 'https://http2.mlstatic.com/D_NQ_NP_639710-MLA116328352957_082026-O.webp',
    tag: 'Lançamento',
    liked: false,
  },
  {
    id: 3,
    name: 'Natura ',
    brand: 'Homem',
    price: 'R$ 134,90',
    img: 'https://financial-blue-ytr6bbmx.edgeone.dev/file.png',
    tag: 'Oferta',
    liked: false,
  },
  {
    id: 4,
    name: 'Luna',
    brand: 'Fascinante',
    price: 'R$ 92,90',
    img: 'https://soviet-aqua-pogh4ii3.edgeone.dev/file.png',
    tag: 'Exclusivo',
    liked: false,
  },
  {
    id: 5,
    name: 'Pula Pula',
    brand: 'Água de colônia',
    price: 'R$ 64,00',
    img: 'https://gorgeous-rose-iq5f0vfg.edgeone.dev/file.png',
    tag: '',
    liked: false,
  },
  {
    id: 6,
    name: 'Pique Pega',
    brand: 'Água de colônia',
    price: 'R$ 64,90',
    img: 'https://cognitive-violet-kdrkszmy.edgeone.dev/file.png',
    tag: 'Oferta',
    liked: false,
  },
  {
    id: 7,
    name: 'Natura',
    brand: 'Todo Dia cada',
    price: 'R$ 81,90',
    img: 'https://i.postimg.cc/9Q4j8Ttr/Gemini-Generated-Image-tb22tptb22tptb22.jpg',
    tag: '',
    liked: false,
  },
  {
    id: 8,
    name: 'Natura',
    brand: 'Kaika cada',
    price: 'R$ 39,90 ',
    img: 'https://i.postimg.cc/j5f1P4TR/7.jpg',
    tag: 'Presente Perfeito',
    liked: false,
  },
  {
    id: 9,
    name: 'Natuara',
    brand: 'Todo Dia a Caixa 5',
    price: 'R$ 31,90',
    img :'https://i.postimg.cc/T2VRFvMJ/6.jpg',
    tag: 'Especial',
    liked: false,
  },
]
