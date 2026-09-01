import { useState, useEffect } from 'react'
import { useInstagram } from '../hooks/useInstagram'

interface InstagramPost {
  id: string
  caption: string
  media_type: string
  media_url: string
  permalink: string
  timestamp: string
}

interface InstagramFeedProps {
  userId?: string
  accessToken?: string
  limit?: number
}

export default function InstagramFeed({ userId, accessToken, limit = 6 }: InstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { getInstagramFeed, openInstagramProfile } = useInstagram()

  useEffect(() => {
    // Dados mock para demonstração
    const mockPosts: InstagramPost[] = [
      {
        id: '1',
        caption: '✨ Novo perfume chegou! Coco Mademoiselle Chanel - um clássico atemporal para quem aprecia elegância. 🌸 #PerfumeGiftShop',
        media_type: 'IMAGE',
        media_url: 'https://i.postimg.cc/W3tNvK0C/watermarked-img-831804646113850329.jpg',
        permalink: 'https://instagram.com/carolpresentesindaiatuba',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        caption: '💝 Presente perfeito para o Dia das Mães! La Vie Est Belle - beleza, sofisticação e carinho em uma embalagem especial.',
        media_type: 'IMAGE',
        media_url: 'https://i.postimg.cc/Fzp7ZqXQ/royal.jpg',
        permalink: 'https://instagram.com/carolpresentesindaiatuba',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
      },
      {
        id: '3',
        caption: '🎁 Coleção de Presentes Premium - Bleu de Chanel, Good Girl e muito mais. Frete grátis para todo Brasil!',
        media_type: 'IMAGE',
        media_url: 'https://i.postimg.cc/RV0Fmgzw/egeo.jpg',
        permalink: 'https://instagram.com/carolpresentesindaiatuba',
        timestamp: new Date(Date.now() - 172800000).toISOString(),
      },
    ]

    if (accessToken && userId) {
      const fetchFeed = async () => {
        try {
          const result = await getInstagramFeed(accessToken, userId)
          if (result && result.data) {
            setPosts(result.data.slice(0, limit))
          } else {
            setPosts(mockPosts)
          }
        } catch (err) {
          setError('Erro ao carregar feed')
          setPosts(mockPosts)
        } finally {
          setLoading(false)
        }
      }
      fetchFeed()
    } else {
      setPosts(mockPosts)
      setLoading(false)
    }
  }, [userId, accessToken, limit, getInstagramFeed])

  if (loading) {
    return (
      <div style={{ padding: '32px 16px', textAlign: 'center', color: '#8c7b74' }}>
        <div style={{ fontSize: 24, marginBottom: 12 }}>📸</div>
        <p>Carregando feed...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '32px 16px', textAlign: 'center', color: '#c9956c' }}>
        <div style={{ fontSize: 24, marginBottom: 12 }}>⚠️</div>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '12px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
        {posts.map((post) => (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: 'relative',
              aspectRatio: '1',
              overflow: 'hidden',
              textDecoration: 'none',
              cursor: 'pointer',
              display: 'block',
              backgroundColor: '#f7e8e0',
            }}
            onMouseEnter={(e) => {
              const overlay = (e.currentTarget as HTMLElement).querySelector('[data-overlay]') as HTMLElement
              if (overlay) overlay.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              const overlay = (e.currentTarget as HTMLElement).querySelector('[data-overlay]') as HTMLElement
              if (overlay) overlay.style.opacity = '0'
            }}
          >
            <img
              src={post.media_url}
              alt={post.caption}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            <div
              data-overlay
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(225, 48, 108, 0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0,
                transition: 'opacity 0.2s',
              }}
            >
              <div style={{ textAlign: 'center', color: '#fff' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ margin: '0 auto' }}>
                  <rect x="2" y="2" width="20" height="20" rx="4.5" ry="4.5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
                <p style={{ margin: '6px 0 0', fontSize: 12, fontWeight: 600 }}>Ver no Instagram</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ padding: '16px 16px 0', textAlign: 'center', marginTop: 12 }}>
        <button
          onClick={() => openInstagramProfile('carolpresentesindaiatuba')}
          style={{
            backgroundColor: '#E1306C',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 24px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: "'Nunito', sans-serif",
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C41E3A'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E1306C'
          }}
        >
          Ver mais no Instagram
        </button>
      </div>
    </div>
  )
}
