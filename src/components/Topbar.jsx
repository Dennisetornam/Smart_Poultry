import { Bell, Search, RefreshCw } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/dashboard':  'Dashboard',
  '/logbook':    'Farm Logbook',
  '/analytics':  'Analytics & AI Insights',
  '/deliveries': 'Delivery Management',
  '/reports':    'Reports',
  '/settings':   'Settings',
}

export default function Topbar() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'SmartPoultry'
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="topbar">
      <div>
        <div className="topbar-title">{title}</div>
        <div className="topbar-date">{dateStr}</div>
      </div>

      <div className="topbar-right">
        {/* Search bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#F7F6E5', border: '1.5px solid #dddabd',
          borderRadius: 9, padding: '7px 13px', width: 210
        }}>
          <Search size={13} color="#8da58f" />
          <input
            placeholder="Search..."
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              fontSize: '0.8rem', color: '#2a3d2b', width: '100%',
              fontFamily: 'Inter, sans-serif'
            }}
          />
        </div>

        {/* Refresh */}
        <button className="topbar-btn" title="Refresh data" onClick={() => window.location.reload()}>
          <RefreshCw size={14} />
        </button>

        {/* Notifications */}
        <button className="topbar-btn" title="Notifications">
          <Bell size={14} />
          <span className="notif-badge" />
        </button>

        {/* Live indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(255,170,0,0.10)', border: '1px solid rgba(255,170,0,0.28)',
          borderRadius: 20, padding: '4px 12px'
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#FFAA00', display: 'inline-block',
            boxShadow: '0 0 6px #FFAA00', animation: 'pulse 2s infinite'
          }} />
          <span style={{ fontSize: '0.72rem', color: '#8a5f00', fontWeight: 600 }}>Live</span>
        </div>
      </div>
    </div>
  )
}
