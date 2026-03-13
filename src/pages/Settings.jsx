import { useState } from 'react'
import { User, Lock, Bell, Database, Shield, Users } from 'lucide-react'

const sections = [
  { id: 'profile', icon: User, label: 'Profile' },
  { id: 'security', icon: Lock, label: 'Security' },
  { id: 'notifications', icon: Bell, label: 'Notifications' },
  { id: 'farm', icon: Database, label: 'Farm Settings' },
  { id: 'users', icon: Users, label: 'Team & Roles' },
]

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile')

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Settings</div>
        <div className="page-desc">Manage your account, farm configuration, and team permissions</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20 }}>
        {/* Settings nav */}
        <div style={{
          background: '#fff', borderRadius: 16, padding: '12px',
          border: '1px solid #e8ede8', height: 'fit-content'
        }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 12px', borderRadius: 10, cursor: 'pointer',
                border: 'none',
                background: activeSection === s.id ? '#f0f7f0' : 'transparent',
                color: activeSection === s.id ? '#1e5e23' : '#5a7a5c',
                fontWeight: activeSection === s.id ? 600 : 400,
                fontSize: '0.85rem', textAlign: 'left',
                fontFamily: 'DM Sans, sans-serif', transition: 'all 0.15s'
              }}
            >
              <s.icon size={16} />
              {s.label}
            </button>
          ))}
        </div>

        {/* Settings content */}
        <div>
          {activeSection === 'profile' && (
            <div className="chart-card">
              <div className="section-title" style={{ marginBottom: 4 }}>Profile Information</div>
              <div style={{ fontSize: '0.78rem', color: '#7a917b', marginBottom: 24 }}>
                Update your personal details and contact information
              </div>

              {/* Avatar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28, paddingBottom: 24, borderBottom: '1px solid #f0f5f0' }}>
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: 'linear-gradient(135deg, #2e7d34, #84be88)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: '#fff'
                }}>AK</div>
                <div>
                  <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', color: '#0a260d' }}>
                    Akpalolo Dennis Etornam
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#7a917b', marginTop: 2 }}>Farm Manager · GCTU</div>
                  <button className="btn-outline" style={{ marginTop: 10, padding: '5px 14px', fontSize: '0.75rem' }}>
                    Change Photo
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 600 }}>
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

              <button className="btn-primary" style={{ marginTop: 8 }}>Save Changes</button>
            </div>
          )}

          {activeSection === 'security' && (
            <div className="chart-card">
              <div className="section-title" style={{ marginBottom: 4 }}>Security Settings</div>
              <div style={{ fontSize: '0.78rem', color: '#7a917b', marginBottom: 24 }}>
                Manage your password and two-factor authentication
              </div>

              <div style={{ maxWidth: 480 }}>
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

              <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid #f0f5f0' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#0a260d', marginBottom: 14 }}>
                  Two-Factor Authentication
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: '#f0f7f0', borderRadius: 12, padding: '14px 18px', border: '1px solid #b5dab7'
                }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0a260d' }}>Enable 2FA via SMS</div>
                    <div style={{ fontSize: '0.75rem', color: '#5a7a5c' }}>Receive a code on your phone at each login</div>
                  </div>
                  <div style={{
                    width: 42, height: 24, borderRadius: 12, background: '#e2e8e2',
                    cursor: 'pointer', position: 'relative', transition: 'background 0.2s'
                  }} />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="chart-card">
              <div className="section-title" style={{ marginBottom: 4 }}>Notification Preferences</div>
              <div style={{ fontSize: '0.78rem', color: '#7a917b', marginBottom: 24 }}>
                Choose what alerts you receive and how
              </div>

              {[
                { title: 'Environmental Alerts', desc: 'Temp, humidity, ammonia threshold breaches', enabled: true },
                { title: 'Mortality Alerts', desc: 'Unusual death counts detected by AI', enabled: true },
                { title: 'Delivery Updates', desc: 'Order status changes and driver notifications', enabled: true },
                { title: 'AI Forecast Ready', desc: 'When new 10-day yield predictions are available', enabled: false },
                { title: 'Daily Summary', desc: 'End-of-day report via email', enabled: true },
                { title: 'Feeding Reminders', desc: 'Scheduled feed time notifications', enabled: false },
              ].map((n, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '14px 0', borderBottom: i < 5 ? '1px solid #f0f5f0' : 'none'
                }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#0a260d' }}>{n.title}</div>
                    <div style={{ fontSize: '0.75rem', color: '#7a917b', marginTop: 2 }}>{n.desc}</div>
                  </div>
                  <div style={{
                    width: 42, height: 24, borderRadius: 12,
                    background: n.enabled ? '#2e7d34' : '#e2e8e2',
                    cursor: 'pointer', position: 'relative',
                    transition: 'background 0.2s'
                  }}>
                    <div style={{
                      position: 'absolute', top: 3,
                      left: n.enabled ? 21 : 3,
                      width: 18, height: 18, borderRadius: '50%',
                      background: '#fff', transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                    }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'farm' && (
            <div className="chart-card">
              <div className="section-title" style={{ marginBottom: 4 }}>Farm Configuration</div>
              <div style={{ fontSize: '0.78rem', color: '#7a917b', marginBottom: 24 }}>
                Set thresholds for IoT sensor alerts and farm parameters
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, maxWidth: 560 }}>
                {[
                  { label: 'Max Temperature (°C)', val: '32' },
                  { label: 'Min Temperature (°C)', val: '18' },
                  { label: 'Max Humidity (%)', val: '75' },
                  { label: 'Max Ammonia (ppm)', val: '20' },
                  { label: 'Daily Egg Target', val: '1200' },
                  { label: 'Alert Mortality Threshold', val: '3' },
                ].map((f, i) => (
                  <div className="form-group" key={i} style={{ marginBottom: 0 }}>
                    <label className="form-label">{f.label}</label>
                    <input className="form-input" type="number" defaultValue={f.val} />
                  </div>
                ))}
              </div>

              <button className="btn-primary" style={{ marginTop: 24 }}>Save Farm Config</button>
            </div>
          )}

          {activeSection === 'users' && (
            <div className="chart-card">
              <div className="section-header">
                <div>
                  <div className="section-title">Team & Roles</div>
                  <div className="section-sub">Manage team member access and permissions</div>
                </div>
                <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '8px 16px' }}>
                  + Invite Member
                </button>
              </div>

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
                    { name: 'Akpalolo Dennis', id: '4231230019', role: 'Admin / Manager', status: 'Active', login: 'Today' },
                    { name: 'Benedict Opoku', id: '4231230083', role: 'Developer', status: 'Active', login: 'Yesterday' },
                    { name: 'Kenneth Mensah', id: '4231230106', role: 'Developer', status: 'Active', login: '2 days ago' },
                  ].map((u, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 30, height: 30, borderRadius: 8,
                            background: 'linear-gradient(135deg, #2e7d34, #84be88)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'Syne', fontWeight: 800, fontSize: '0.7rem', color: '#fff'
                          }}>
                            {u.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          {u.name}
                        </div>
                      </td>
                      <td style={{ color: '#5a7a5c', fontFamily: 'Syne, sans-serif', fontSize: '0.78rem' }}>{u.id}</td>
                      <td><span className="badge badge-green">{u.role}</span></td>
                      <td><span className="badge badge-green">{u.status}</span></td>
                      <td style={{ color: '#7a917b', fontSize: '0.82rem' }}>{u.login}</td>
                      <td>
                        <button className="btn-outline" style={{ padding: '4px 12px', fontSize: '0.75rem' }}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
