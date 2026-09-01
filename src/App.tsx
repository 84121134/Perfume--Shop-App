import { useState, useEffect } from 'react'
import InstagramShare from './components/InstagramShare'
import FollowButton from './components/FollowButton'
import InstagramFeed from './components/InstagramFeed'
import { PRODUCTS, useInstagram } from './hooks/useInstagram'

const STORIES = [
  { id: 1, label: 'Novidades', img: 'https://manual-jade-lug9m8hi.edgeone.dev/file.png' },
  { id: 2, label: 'Femininos', img: 'https://i.postimg.cc/W3tNvK0C/watermarked-img-831804646113850329.jpg' },
  { id: 3, label: 'Masculinos', img: 'https://images.unsplash.com/photo-1543422655-ac1c6ca993ed?w=120&h=120&fit=crop&auto=format' },
  { id: 4, label: 'Presentes', img: 'https://images.unsplash.com/photo-1759420319818-1a2c8684a584?w=120&h=120&fit=crop&auto=format' },
  { id: 5, label: 'Ofertas', img: 'https://flying-sapphire-ngnsds7k.edgeone.dev/file.png' },
]

type Product = typeof PRODUCTS[0]

export default function App() {
  const [tab, setTab] = useState<'loja' | 'feed'>('loja')
  const [liked, setLiked] = useState<Record<number, boolean>>({})
  const [activeStory, setActiveStory] = useState<number | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [selected, setSelected] = useState<Product | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { initFacebookSDK } = useInstagram()

  useEffect(() => {
    initFacebookSDK()
  }, [initFacebookSDK])

  const toggleLike = (id: number) => setLiked(prev => ({ ...prev, [id]: !prev[id] }))

  const filtered = PRODUCTS.filter(p =>
    searchQuery === '' ||
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", backgroundColor: '#fdf6f0', minHeight: '100vh', maxWidth: 480, margin: '0 auto', position: 'relative', overflow: 'hidden' }}>
      {/* Top Nav */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #f0e6df', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={() => setSearchOpen(!searchOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2d2523" strokeWidth={1.8}>
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" />
          </svg>
        </button>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: '#2d2523', margin: 0 }}>
          Carol Presentes
        </h1>
        <button onClick={() => setCartCount(c => c)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, position: 'relative' }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="#2d2523" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
          </svg>
          {cartCount > 0 && (
            <span style={{ position: 'absolute', top: 0, right: 0, background: '#c9956c', color: '#fff', borderRadius: '50%', width: 16, height: 16, fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* Search bar */}
      {searchOpen && (
        <div style={{ backgroundColor: '#fff', padding: '8px 16px', borderBottom: '1px solid #f0e6df' }}>
          <input
            autoFocus
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar perfumes e presentes..."
            style={{ width: '100%', border: '1px solid #f0e6df', borderRadius: 24, padding: '8px 16px', fontSize: 14, outline: 'none', color: '#2d2523', backgroundColor: '#fdf6f0', fontFamily: "'Nunito', sans-serif" }}
          />
        </div>
      )}

      {/* Profile */}
      <div style={{ backgroundColor: '#fff', padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <img
              src="https://i.postimg.cc/ysFmfdfs/profile-image-png.png"
              alt="Perfil Carol Presentes"
              style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 2, right: 2, width: 20, height: 20, backgroundColor: '#c9956c', borderRadius: '50%', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="white">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
              {[['9', 'publicações'], ['1,2K', 'seguidores'], ['248', 'seguindo']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#2d2523' }}>{n}</div>
                  <div style={{ fontSize: 11, color: '#8c7b74' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 10 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: '#2d2523' }}>Carol Presentes 🌹</div>
          <div style={{ fontSize: 13, color: '#5c4d47', lineHeight: 1.4, marginTop: 2 }}>
            🎁 Loja de presentes & perfumes<br />
            ✨ Frete grátis acima de R$ 299<br />
            📍 Indaiatuba, SP — Entrega para todo Brasil<br />
            💌 WhatsApp: (19) 19971455659
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 12, marginBottom: 12 }}>
          <FollowButton username="carolpresentesindaiatuba" variant="primary" />
          <button style={{ flex: 1, backgroundColor: '#f7e8e0', color: '#2d2523', border: 'none', borderRadius: 8, padding: '7px 0', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}>
            Mensagem
          </button>
          <button style={{ width: 36, backgroundColor: '#f7e8e0', color: '#2d2523', border: 'none', borderRadius: 8, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#2d2523" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Stories Highlights */}
      <div style={{ backgroundColor: '#fff', paddingBottom: 16, borderBottom: '1px solid #f0e6df' }}>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', padding: '0 16px' }}>
          {STORIES.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveStory(activeStory === s.id ? null : s.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 0, flexShrink: 0 }}
            >
              <div style={{ width: 60, height: 60, borderRadius: '50%', padding: 2, background: activeStory === s.id ? '#a0624a' : 'linear-gradient(135deg, #c9956c, #e8b4a0, #f7c6b8)', }}>
                <img
                  src={s.img}
                  alt={s.label}
                  style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff' }}
                />
              </div>
              <span style={{ fontSize: 11, color: '#2d2523', fontWeight: 500 }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: '#fff', display: 'flex', borderBottom: '1px solid #f0e6df' }}>
        {([['loja', '🛍️'], ['feed', '📸']] as const).map(([key, icon]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{ flex: 1, padding: '12px 0', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, borderBottom: tab === key ? '2px solid #c9956c' : '2px solid transparent', color: tab === key ? '#c9956c' : '#8c7b74', fontWeight: tab === key ? 700 : 400, fontSize: 13, fontFamily: "'Nunito', sans-serif", transition: 'all 0.2s' }}
          >
            <span>{icon}</span>
            <span style={{ textTransform: 'capitalize' }}>{key}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === 'loja' && (
        <div style={{ padding: '4px 1px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 2 }}>
            {(searchQuery ? filtered : PRODUCTS).map(product => (
              <button
                key={product.id}
                onClick={() => setSelected(product)}
                style={{ position: 'relative', background: 'none', border: 'none', padding: 0, cursor: 'pointer', aspectRatio: '1', overflow: 'hidden' }}
              >
                <img
                  src={product.img}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', backgroundColor: '#f7e8e0' }}
                />
                {product.tag && (
                  <span style={{ position: 'absolute', top: 6, left: 6, backgroundColor: '#c9956c', color: '#fff', fontSize: 9, fontWeight: 700, padding: '2px 6px', borderRadius: 10, letterSpacing: 0.3 }}>
                    {product.tag}
                  </span>
                )}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(45,37,35,0.7))', padding: '16px 6px 6px', color: '#fff' }}>
                  <div style={{ fontSize: 10, fontWeight: 700 }}>{product.price}</div>
                </div>
                {liked[product.id] && (
                  <span style={{ position: 'absolute', top: 6, right: 6, fontSize: 14 }}>❤️</span>
                )}
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 24px', color: '#8c7b74' }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
              <p style={{ margin: 0, fontWeight: 600 }}>Nenhum produto encontrado</p>
              <p style={{ margin: '4px 0 0', fontSize: 13 }}>Tente outro termo de busca</p>
            </div>
          )}
        </div>
      )}

      {tab === 'feed' && (
        <div>
          <InstagramFeed limit={6} />
        </div>
      )}

      {/* Bottom Nav */}
      <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#fff', borderTop: '1px solid #f0e6df', display: 'flex', justifyContent: 'space-around', padding: '10px 0 16px', zIndex: 50 }}>
        {[
          { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>, active: true },
          { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="m21 21-4.35-4.35" /></svg>, active: false },
          { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>, active: false },
          { icon: <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>, active: false },
        ].map((item, i) => (
          <button key={i} style={{ background: 'none', border: 'none', cursor: 'pointer', color: item.active ? '#c9956c' : '#8c7b74', padding: 6, transition: 'color 0.2s' }}>
            {item.icon}
          </button>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{ backgroundColor: '#fff', borderRadius: '20px 20px 0 0', width: '100%', maxWidth: 480, maxHeight: '85vh', overflowY: 'auto', padding: '0 0 32px' }}
          >
            <div style={{ width: 36, height: 4, backgroundColor: '#e0d5cf', borderRadius: 2, margin: '12px auto 0' }}></div>
            <img
              src={selected.img}
              alt={selected.name}
              style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', backgroundColor: '#f7e8e0', marginTop: 12 }}
            />
            <div style={{ padding: '20px 20px 0' }}>
              {selected.tag && (
                <span style={{ backgroundColor: '#f7e8e0', color: '#c9956c', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, display: 'inline-block', marginBottom: 10 }}>
                  {selected.tag}
                </span>
              )}
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: '#2d2523', margin: '0 0 4px' }}>{selected.name}</h2>
              <p style={{ color: '#8c7b74', fontSize: 14, margin: '0 0 12px', fontWeight: 600 }}>{selected.brand}</p>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#c9956c', marginBottom: 16 }}>{selected.price}</div>

              <p style={{ fontSize: 14, color: '#5c4d47', lineHeight: 1.6, margin: '0 0 24px' }}>
                Um presente perfeito para quem você ama. Fragrância sofisticada, embalagem elegante e entrega em todo o Brasil. Presente-se ou presenteie com muito carinho! 🌸
              </p>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => toggleLike(selected.id)}
                  style={{ width: 44, height: 44, borderRadius: 10, border: '1.5px solid #f0e6df', backgroundColor: '#fff', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  {liked[selected.id] ? '❤️' : '🤍'}
                </button>
                <button
                  onClick={() => { setCartCount(c => c + 1); setSelected(null) }}
                  style={{ flex: 1, backgroundColor: '#c9956c', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 0', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif" }}
                >
                  🛍️ Adicionar ao carrinho
                </button>
              </div>

              <InstagramShare product={selected} />

              <button
                style={{ width: '100%', marginTop: 10, backgroundColor: '#25D366', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 0', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'Nunito', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                Comprar pelo WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
