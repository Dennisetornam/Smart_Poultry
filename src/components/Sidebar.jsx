import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, BookOpen, BarChart2, Truck,
  FileText, Settings, LogOut, Leaf
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { label: 'Dashboard',   icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Farm Logbook', icon: BookOpen,         to: '/logbook'   },
  { label: 'Analytics & AI', icon: BarChart2,      to: '/analytics' },
  { label: 'Deliveries',  icon: Truck,             to: '/deliveries'},
  { label: 'Reports',     icon: FileText,          to: '/reports'   },
]

const bottomItems = [
  { label: 'Settings', icon: Settings, to: '/settings' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="brand">
          <Leaf size={18} color="#FFAA00" />
          Smart<span style={{ color: '#84be88' }}>Poultry</span>
          <span className="dot" />
        </div>
        <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.28)', marginTop: 4, paddingLeft: 26 }}>
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
            <Icon size={16} className="icon" />
            {label}
          </NavLink>
        ))}

        <div className="nav-section-label" style={{ marginTop: 12 }}>System</div>
        {bottomItems.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
          >
            <Icon size={16} className="icon" />
            {label}
          </NavLink>
        ))}

        <div
          className="nav-item"
          style={{ marginTop: 'auto', color: 'rgba(239,68,68,0.75)' }}
          onClick={handleLogout}
        >
          <LogOut size={16} className="icon" />
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
