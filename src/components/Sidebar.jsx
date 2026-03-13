import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, BarChart2, Truck,
  FileText, Settings, LogOut, Leaf
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Farm Logbook', icon: BookOpen, to: '/logbook' },
  { label: 'Analytics & AI', icon: BarChart2, to: '/analytics' },
  { label: 'Deliveries', icon: Truck, to: '/deliveries' },
  { label: 'Reports', icon: FileText, to: '/reports' },
]

const bottomItems = [
  { label: 'Settings', icon: Settings, to: '/settings' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="brand">
          <Leaf size={20} color="#84be88" />
          Smart<span style={{ color: '#84be88' }}>Poultry</span>
          <span className="dot" />
        </div>
        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: 4, paddingLeft: 30 }}>
          AI Farm Management
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="nav-section-label">Main Menu</div>
        {navItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={17} className="icon" />
            {label}
          </NavLink>
        ))}

        <div className="nav-section-label" style={{ marginTop: 16 }}>System</div>
        {bottomItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={17} className="icon" />
            {label}
          </NavLink>
        ))}

        <div
          className="nav-item"
          style={{ marginTop: 'auto', color: 'rgba(239,68,68,0.7)' }}
          onClick={() => window.location.href = '/'}
        >
          <LogOut size={17} className="icon" />
          Logout
        </div>
      </nav>

      {/* User */}
      <div className="sidebar-user">
        <div className="user-avatar">AK</div>
        <div className="user-info">
          <div className="name">Akpalolo Dennis</div>
          <div className="role">Farm Manager</div>
        </div>
      </div>
    </aside>
  )
}
