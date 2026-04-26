import { useState } from 'react'
import { Leaf, Eye, EyeOff, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import { useLogin } from '../hooks/auth/useLogin'

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const [role, setRole] = useState('farmer')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { mutate: login, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ email, password, role })
  }

  const features = [
    'AI-powered egg yield forecasting (10-day)',
    'Real-time IoT environmental monitoring',
    'Integrated delivery & logistics tracking',
    'Automated farm logbook & analytics',
  ]

  return (
    <form className="login-page" onSubmit={handleSubmit} noValidate>
      {/* Left panel */}
      <div className="login-left">
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 44 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'rgba(255,170,0,0.18)',
              border: '1px solid rgba(255,170,0,0.28)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Leaf size={20} color="#FFAA00" />
            </div>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.2rem',
              fontWeight: 700, color: '#fff', letterSpacing: '-0.02em'
            }}>
              Smart<span style={{ color: '#84be88' }}>Poultry</span>
            </span>
          </div>

          <div style={{ marginBottom: 30 }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,170,0,0.15)',
              border: '1px solid rgba(255,170,0,0.28)',
              borderRadius: 20, padding: '4px 14px',
              fontSize: '0.70rem', color: '#FFAA00',
              fontWeight: 600, letterSpacing: '0.07em',
              textTransform: 'uppercase', marginBottom: 14
            }}>
              AI-Driven Farm Intelligence
            </div>

            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
              fontSize: '2.1rem', color: '#fff',
              lineHeight: 1.15, letterSpacing: '-0.03em'
            }}>
              Smarter Poultry.<br />
              <span style={{ color: '#84be88' }}>Better Yields.</span>
            </h1>

            <p style={{
              marginTop: 14, color: 'rgba(255,255,255,0.58)',
              fontSize: '0.88rem', lineHeight: 1.65, maxWidth: 320
            }}>
              An integrated platform built for Ghanaian poultry farmers — from daily logging to AI-powered decision support.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle2 size={15} color="#FFAA00" />
                <span style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.72)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          position: 'relative', zIndex: 1,
          color: 'rgba(255,255,255,0.22)', fontSize: '0.70rem'
        }}>
          © 2026 SmartPoultry · GCTU Final Year Project
        </div>
      </div>

      {/* Right panel */}
      <div className="login-right">
        <div className="login-card">
          <div style={{ marginBottom: 28 }}>
            <h2 style={{
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.45rem',
              fontWeight: 700, color: '#0d1f0e', letterSpacing: '-0.02em',
              marginBottom: 6
            }}>Welcome back</h2>
            <p style={{ fontSize: '0.875rem', color: '#5e7a61', lineHeight: 1.55 }}>
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
                    borderRadius: 9,
                    border: role === r ? '1.5px solid #237227' : '1.5px solid #dddabd',
                    background: role === r ? 'rgba(35,114,39,0.07)' : '#fff',
                    color: role === r ? '#237227' : '#8da58f',
                    fontSize: '0.82rem',
                    fontWeight: role === r ? 600 : 400,
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    fontFamily: 'Inter, sans-serif',
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
              id="login-email"
              placeholder="dennis@smartpoultry.gh"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                className="form-input"
                type={showPass ? 'text' : 'password'}
                id="login-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isPending}
                required
                style={{ paddingRight: 44 }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: 13, top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#8da58f'
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: 22
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: '#237227', width: 14, height: 14 }} />
              <span style={{ fontSize: '0.8rem', color: '#5e7a61' }}>Remember me</span>
            </label>
            <span style={{
              fontSize: '0.8rem', color: '#237227', cursor: 'pointer', fontWeight: 600
            }}>Forgot password?</span>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px', opacity: isPending ? 0.75 : 1 }}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Signing in…
              </>
            ) : (
              <>
                Sign In to Dashboard
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <div style={{
            marginTop: 20, padding: '12px 14px',
            background: 'rgba(35,114,39,0.06)', borderRadius: 9,
            border: '1px solid rgba(35,114,39,0.14)'
          }}>
            <p style={{ fontSize: '0.75rem', color: '#5e7a61', lineHeight: 1.55 }}>
              <strong style={{ color: '#237227' }}>Demo credentials:</strong> Use any email & password above. Select a role to see role-specific views.
            </p>
          </div>
        </div>
      </div>
    </form>
  )
}
