import { useInstagram } from '../hooks/useInstagram'

interface FollowButtonProps {
  username?: string
  variant?: 'primary' | 'secondary'
}

export default function FollowButton({ username = 'carolpresentesindaiatuba', variant = 'primary' }: FollowButtonProps) {
  const { openInstagramProfile } = useInstagram()

  const primaryStyle = {
    backgroundColor: '#E1306C',
    color: '#fff',
  }

  const secondaryStyle = {
    backgroundColor: '#f7e8e0',
    color: '#2d2523',
  }

  const style = variant === 'primary' ? primaryStyle : secondaryStyle

  return (
    <button
      onClick={() => openInstagramProfile(username)}
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        border: 'none',
        borderRadius: 8,
        padding: '10px 16px',
        fontSize: 13,
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: "'Nunito', sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        transition: 'all 0.2s',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#C41E3A'
        } else {
          (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#e0d5cf'
        }
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = style.backgroundColor
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <rect x="2" y="2" width="20" height="20" rx="4.5" ry="4.5" fill="none" stroke="currentColor" strokeWidth="2"/>
        <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
      </svg>
      Seguir no Instagram
    </button>
  )
}
