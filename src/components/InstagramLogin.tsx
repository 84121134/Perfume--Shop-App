import { useState } from 'react'
import { useInstagram } from '../hooks/useInstagram'

interface InstagramLoginProps {
  onSuccess?: (userData: any) => void
  onError?: (error: string) => void
}

export default function InstagramLogin({ onSuccess, onError }: InstagramLoginProps) {
  const [loading, setLoading] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const { loginWithFacebook, initFacebookSDK } = useInstagram()

  const handleLogin = async () => {
    setLoading(true)
    try {
      initFacebookSDK()
      const result = await loginWithFacebook()
      setLoggedIn(true)
      onSuccess?.(result)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      onError?.(errorMessage)
      setLoggedIn(false)
    } finally {
      setLoading(false)
    }
  }

  if (loggedIn) {
    return (
      <div style={{
        backgroundColor: '#fff',
        padding: '16px',
        borderRadius: 8,
        textAlign: 'center',
        border: '2px solid #E1306C',
      }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>✅</div>
        <p style={{ margin: '0 0 8px', color: '#2d2523', fontWeight: 700 }}>Conectado com Instagram!</p>
        <p style={{ margin: 0, color: '#8c7b74', fontSize: 13 }}>Agora você pode compartilhar produtos com seus amigos.</p>
      </div>
    )
  }

  return (
    <button
      onClick={handleLogin}
      disabled={loading}
      style={{
        backgroundColor: '#E1306C',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '12px 20px',
        fontSize: 14,
        fontWeight: 700,
        cursor: loading ? 'not-allowed' : 'pointer',
        fontFamily: "'Nunito', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: '100%',
        opacity: loading ? 0.7 : 1,
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C41E3A'
        }
      }}
      onMouseLeave={(e) => {
        if (!loading) {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#E1306C'
        }
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
      {loading ? 'Conectando...' : 'Conectar com Instagram'}
    </button>
  )
}
