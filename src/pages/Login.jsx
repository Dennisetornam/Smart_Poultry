import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Leaf, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const [role, setRole] = useState('farmer')
  const navigate = useNavigate()

  const features = [
    'AI-powered egg yield forecasting (10-day)',
    'Real-time IoT environmental monitoring',
    'Integrated delivery & logistics tracking',
    'Automated farm logbook & analytics',
  ]

  return (
    <div className="login-page">
      {/* Left panel */}
      <div className="login-left">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(132,190,136,0.2)',
              border: '1px solid rgba(132,190,136,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Leaf size={20} color="#84be88" />
            </div>
            <span style={{
              fontFamily: 'Syne, sans-serif', fontSize: '1.2rem',
              fontWeight: 800, color: '#fff', letterSpacing: '-0.02em'
            }}>
              Smart<span style={{ color: '#84be88' }}>Poultry</span>
            </span>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(132,190,136,0.15)',
              border: '1px solid rgba(132,190,136,0.25)',
              borderRadius: 20, padding: '4px 14px',
              fontSize: '0.72rem', color: '#84be88',
              fontWeight: 500, letterSpacing: '0.06em',
              textTransform: 'uppercase', marginBottom: 16
            }}>
              AI-Driven Farm Intelligence
            </div>

            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 800,
              fontSize: '2.2rem', color: '#fff',
              lineHeight: 1.15, letterSpacing: '-0.03em'
            }}>
              Smarter Poultry.<br />
              <span style={{ color: '#84be88' }}>Better Yields.</span>
            </h1>

            <p style={{
              marginTop: 16, color: 'rgba(255,255,255,0.55)',
              fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 340
            }}>
              An integrated platform built for Ghanaian poultry farmers — from daily logging to AI-powered decision support.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={16} color="#84be88" />
                <span style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.7)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          color: 'rgba(255,255,255,0.25)', fontSize: '0.72rem'
        }}>
          © 2026 SmartPoultry · GCTU Final Year Project
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-card">
          <div style={{ marginBottom: 32 }}>
            <h2 style={{
              fontFamily: 'Syne, sans-serif', fontSize: '1.5rem',
              fontWeight: 800, color: '#0a260d', letterSpacing: '-0.02em',
              marginBottom: 6
            }}>Welcome back</h2>
            <p style={{ fontSize: '0.875rem', color: '#7a917b' }}>
              Sign in to access your farm dashboard
            </p>
          </div>

          {/* Role selector */}
          <div className="form-group">
            <label className="form-label">Sign in as</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {['farmer', 'manager', 'delivery', 'admin'].map(r => (
                <button
                  key={r}
                  onClick={() => setRole(r)}
                  style={{
                    padding: '9px 14px',
                    borderRadius: 10,
                    border: role === r ? '1.5px solid #2e7d34' : '1.5px solid #dde8dd',
                    background: role === r ? '#f0f7f0' : '#fff',
                    color: role === r ? '#1e5e23' : '#7a917b',
                    fontSize: '0.8rem',
                    fontWeight: role === r ? 600 : 400,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    fontFamily: 'DM Sans, sans-serif',
                    transition: 'all 0.15s'
                  }}
                >
                  {r === 'delivery' ? 'Delivery Staff' : r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              className="form-input"
              type="email"
              placeholder="dennis@smartpoultry.gh"
              defaultValue="dennis@smartpoultry.gh"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                defaultValue="password123"
                style={{ paddingRight: 44 }}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: 14, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#7a917b'
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 24
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: '#2e7d34' }} />
              <span style={{ fontSize: '0.8rem', color: '#5a7a5c' }}>Remember me</span>
            </label>
            <span style={{
              fontSize: '0.8rem', color: '#2e7d34', cursor: 'pointer', fontWeight: 500
            }}>Forgot password?</span>
          </div>

          <button
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '13px' }}
            onClick={() => navigate('/dashboard')}
          >
            Sign In to Dashboard
            <ArrowRight size={16} />
          </button>

          <div style={{
            marginTop: 24, padding: 14,
            background: '#f0f7f0', borderRadius: 10,
            border: '1px solid #dceedd'
          }}>
            <p style={{ fontSize: '0.75rem', color: '#5a7a5c', lineHeight: 1.5 }}>
              <strong style={{ color: '#1e5e23' }}>Demo credentials:</strong> Use any email & password above. Select a role to see role-specific views.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
