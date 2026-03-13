import { Bell, Search, RefreshCw } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/logbook': 'Farm Logbook',
  '/analytics': 'Analytics & AI Insights',
  '/deliveries': 'Delivery Management',
  '/reports': 'Reports',
  '/settings': 'Settings',
}

export default function Topbar() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'SmartPoultry'
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

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
          background: '#f4f6f3', border: '1px solid #e2e8e2',
          borderRadius: 10, padding: '8px 14px', width: 220
        }}>
          <Search size={14} color="#7a917b" />
          <input
            placeholder="Search..."
            style={{
              border: 'none', background: 'transparent', outline: 'none',
              fontSize: '0.8rem', color: '#2a3f2b', width: '100%',
              fontFamily: 'DM Sans, sans-serif'
            }}
          />
        </div>

        {/* Refresh */}
        <button className="topbar-btn" title="Refresh data">
          <RefreshCw size={15} />
        </button>

        {/* Notifications */}
        <button className="topbar-btn" title="Notifications">
          <Bell size={15} />
          <span className="notif-badge" />
        </button>

        {/* Live indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: '#f0f7f0', border: '1px solid #b5dab7',
          borderRadius: 20, padding: '5px 12px'
        }}>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: '#22c55e', display: 'inline-block',
            boxShadow: '0 0 6px #22c55e', animation: 'pulse 2s infinite'
          }} />
          <span style={{ fontSize: '0.72rem', color: '#1e5e23', fontWeight: 500 }}>Live</span>
        </div>
      </div>
    </div>
  )
}
