import { useInstagram } from '../hooks/useInstagram'

interface InstagramShareProps {
  product: {
    id: number
    name: string
    price: string
    img: string
    brand: string
  }
}

export default function InstagramShare({ product }: InstagramShareProps) {
  const { shareToInstagram, shareToWhatsApp } = useInstagram()

  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
      <button
        onClick={() => shareToInstagram(product)}
        style={{
          flex: 1,
          backgroundColor: '#E1306C',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 0',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: "'Nunito', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C41E3A'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E1306C'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="4.5" ry="4.5" fill="none" stroke="currentColor" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
        </svg>
        Compartilhar
      </button>

      <button
        onClick={() => shareToWhatsApp(product)}
        style={{
          flex: 1,
          backgroundColor: '#25D366',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '10px 0',
          fontSize: 13,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: "'Nunito', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#1FAF38'
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#25D366'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.075-.124-.272-.198-.57-.347m-5.421-7.403h-.004a6.963 6.963 0 00-6.968 6.963 6.971 6.971 0 001.012 3.532l1.422 2.323-1.519 4.674 4.782-1.514 2.36 1.413a6.957 6.957 0 003.97 1.23h.005c3.87 0 6.970-3.1 6.970-6.97a6.963 6.963 0 00-6.997-6.961" />
        </svg>
        WhatsApp
      </button>
    </div>
  )
}
