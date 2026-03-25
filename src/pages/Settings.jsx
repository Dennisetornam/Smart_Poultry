import { useState } from 'react'
import { User, Lock, Bell, Database, Users } from 'lucide-react'

const sections = [
  { id: 'profile',       icon: User,     label: 'Profile'        },
  { id: 'security',      icon: Lock,     label: 'Security'       },
  { id: 'notifications', icon: Bell,     label: 'Notifications'  },
  { id: 'farm',          icon: Database, label: 'Farm Settings'  },
  { id: 'users',         icon: Users,    label: 'Team & Roles'   },
]

function Toggle({ enabled, onChange }) {
  return (
    <div
      className="toggle-track"
      style={{ background: enabled ? '#237227' : '#dddabd' }}
      onClick={onChange}
    >
      <div
        className="toggle-thumb"
        style={{ left: enabled ? 21 : 3 }}
      />
    </div>
  )
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [twoFAEnabled, setTwoFAEnabled] = useState(false)
  const [notifications, setNotifications] = useState({
    environmental: true,
    mortality:     true,
    delivery:      true,
    forecast:      false,
    daily:         true,
    feeding:       false,
  })

  const notifItems = [
    { key: 'environmental', title: 'Environmental Alerts',  desc: 'Temp, humidity, ammonia threshold breaches'         },
    { key: 'mortality',     title: 'Mortality Alerts',      desc: 'Unusual death counts detected by AI'                },
    { key: 'delivery',      title: 'Delivery Updates',      desc: 'Order status changes and driver notifications'      },
    { key: 'forecast',      title: 'AI Forecast Ready',     desc: 'When new 10-day yield predictions are available'    },
    { key: 'daily',         title: 'Daily Summary',         desc: 'End-of-day report via email'                        },
    { key: 'feeding',       title: 'Feeding Reminders',     desc: 'Scheduled feed time notifications'                  },
  ]

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Settings</div>
        <div className="page-desc">Manage your account, farm configuration, and team permissions</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '210px 1fr', gap: 18 }}>
        {/* Settings nav */}
        <div style={{
          background: '#fff', borderRadius: 14, padding: '10px',
          border: '1px solid #dddabd', height: 'fit-content'
        }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 9,
                padding: '9px 11px', borderRadius: 9, cursor: 'pointer',
                border: 'none',
                background: activeSection === s.id ? 'rgba(35,114,39,0.08)' : 'transparent',
                color:      activeSection === s.id ? '#237227' : '#5e7a61',
                fontWeight: activeSection === s.id ? 600 : 400,
                fontSize: '0.84rem', textAlign: 'left',
                fontFamily: 'Inter, sans-serif', transition: 'all 0.15s'
              }}
            >
              <s.icon size={15} />
              {s.label}
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div>
          {/* ── Profile ── */}
          {activeSection === 'profile' && (
            <div className="chart-card">
              <div className="section-title" style={{ marginBottom: 3 }}>Profile Information</div>
              <div style={{ fontSize: '0.78rem', color: '#5e7a61', marginBottom: 22, lineHeight: 1.55 }}>
                Update your personal details and contact information
              </div>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 22, borderBottom: '1px solid #edebd6' }}>
                <div style={{
                  width: 62, height: 62, borderRadius: 14,
                  background: 'linear-gradient(135deg, #237227, #84be88)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '1.35rem', color: '#fff'
                }}>AK</div>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.98rem', color: '#0d1f0e' }}>
                    Akpalolo Dennis Etornam
                  </div>
                  <div style={{ fontSize: '0.79rem', color: '#8da58f', marginTop: 2 }}>Farm Manager · GCTU</div>
                  <button className="btn-outline" style={{ marginTop: 9, padding: '5px 13px', fontSize: '0.74rem' }}>
                    Change Photo
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 580 }}>
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input className="form-input" defaultValue="Akpalolo Dennis" />
                </div>
                <div className="form-group">
                  <label className="form-label">Student ID</label>
                  <input className="form-input" defaultValue="4231230019" />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" defaultValue="dennis@smartpoultry.gh" />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input className="form-input" defaultValue="+233 XX XXX XXXX" />
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select className="form-select">
                    <option>Farm Manager</option>
                    <option>Farmer</option>
                    <option>Delivery Staff</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Farm Name</label>
                  <input className="form-input" defaultValue="SmartPoultry Demo Farm" />
                </div>
              </div>

              <button className="btn-primary" style={{ marginTop: 4 }}>Save Changes</button>
            </div>
          )}

          {/* ── Security ── */}
          {activeSection === 'security' && (
            <div className="chart-card">
              <div className="section-title" style={{ marginBottom: 3 }}>Security Settings</div>
              <div style={{ fontSize: '0.78rem', color: '#5e7a61', marginBottom: 22, lineHeight: 1.55 }}>
                Manage your password and two-factor authentication
              </div>

              <div style={{ maxWidth: 460 }}>
                <div className="form-group">
                  <label className="form-label">Current Password</label>
                  <input className="form-input" type="password" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input className="form-input" type="password" placeholder="••••••••" />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input className="form-input" type="password" placeholder="••••••••" />
                </div>
                <button className="btn-primary">Update Password</button>
              </div>

              <div style={{ marginTop: 26, paddingTop: 22, borderTop: '1px solid #edebd6' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0d1f0e', marginBottom: 12 }}>
                  Two-Factor Authentication
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'rgba(35,114,39,0.06)', borderRadius: 11, padding: '14px 16px',
                  border: '1px solid rgba(35,114,39,0.15)'
                }}>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 500, color: '#0d1f0e' }}>Enable 2FA via SMS</div>
                    <div style={{ fontSize: '0.74rem', color: '#5e7a61', marginTop: 2, lineHeight: 1.5 }}>Receive a code on your phone at each login</div>
                  </div>
                  <Toggle enabled={twoFAEnabled} onChange={() => setTwoFAEnabled(v => !v)} />
                </div>
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          {activeSection === 'notifications' && (
            <div className="chart-card">
              <div className="section-title" style={{ marginBottom: 3 }}>Notification Preferences</div>
              <div style={{ fontSize: '0.78rem', color: '#5e7a61', marginBottom: 22, lineHeight: 1.55 }}>
                Choose what alerts you receive and how
              </div>

              {notifItems.map((n, i) => (
                <div key={n.key} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '13px 0', borderBottom: i < notifItems.length - 1 ? '1px solid #edebd6' : 'none'
                }}>
                  <div>
                    <div style={{ fontSize: '0.845rem', fontWeight: 500, color: '#0d1f0e' }}>{n.title}</div>
                    <div style={{ fontSize: '0.74rem', color: '#5e7a61', marginTop: 2, lineHeight: 1.45 }}>{n.desc}</div>
                  </div>
                  <Toggle
                    enabled={notifications[n.key]}
                    onChange={() => setNotifications(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Farm Settings ── */}
          {activeSection === 'farm' && (
            <div className="chart-card">
              <div className="section-title" style={{ marginBottom: 3 }}>Farm Configuration</div>
              <div style={{ fontSize: '0.78rem', color: '#5e7a61', marginBottom: 22, lineHeight: 1.55 }}>
                Set thresholds for IoT sensor alerts and farm parameters
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, maxWidth: 540 }}>
                {[
                  { label: 'Max Temperature (°C)',      val: '32'   },
                  { label: 'Min Temperature (°C)',      val: '18'   },
                  { label: 'Max Humidity (%)',           val: '75'   },
                  { label: 'Max Ammonia (ppm)',          val: '20'   },
                  { label: 'Daily Egg Target',           val: '1200' },
                  { label: 'Alert Mortality Threshold',  val: '3'    },
                ].map((f, i) => (
                  <div className="form-group" key={i} style={{ marginBottom: 0 }}>
                    <label className="form-label">{f.label}</label>
                    <input className="form-input" type="number" defaultValue={f.val} />
                  </div>
                ))}
              </div>

              <button className="btn-primary" style={{ marginTop: 22 }}>Save Farm Config</button>
            </div>
          )}

          {/* ── Team & Roles ── */}
          {activeSection === 'users' && (
            <div className="chart-card">
              <div className="section-header">
                <div>
                  <div className="section-title">Team & Roles</div>
                  <div className="section-sub">Manage team member access and permissions</div>
                </div>
                <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '7px 14px' }}>
                  + Invite Member
                </button>
              </div>

              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Student ID</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Last Login</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Akpalolo Dennis', id: '4231230019', role: 'Admin / Manager', status: 'Active', login: 'Today'      },
                      { name: 'Benedict Opoku',  id: '4231230083', role: 'Developer',       status: 'Active', login: 'Yesterday'  },
                      { name: 'Kenneth Mensah',  id: '4231230106', role: 'Developer',       status: 'Active', login: '2 days ago' },
                    ].map((u, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 500 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                            <div style={{
                              width: 30, height: 30, borderRadius: 8,
                              background: 'linear-gradient(135deg, #237227, #84be88)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '0.68rem', color: '#fff'
                            }}>
                              {u.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            {u.name}
                          </div>
                        </td>
                        <td style={{ color: '#5e7a61', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.78rem' }}>{u.id}</td>
                        <td><span className="badge badge-green">{u.role}</span></td>
                        <td><span className="badge badge-green">{u.status}</span></td>
                        <td style={{ color: '#8da58f', fontSize: '0.82rem' }}>{u.login}</td>
                        <td>
                          <button className="btn-outline" style={{ padding: '4px 11px', fontSize: '0.74rem' }}>
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
