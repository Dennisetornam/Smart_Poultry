import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Area, AreaChart, ComposedChart
} from 'recharts'
import { Brain, TrendingUp, Zap, Target } from 'lucide-react'
import { feedConversionData, forecastData, sensorData } from '../data/dummy'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#0a260d', color: '#fff', borderRadius: 10,
        padding: '10px 14px', fontSize: '0.78rem'
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }}>
            {p.name}: {typeof p.value === 'number' ? p.value.toLocaleString() : p.value}
          </div>
        ))}
      </div>
    )
  }
  return null
}

function InsightCard({ icon: Icon, color, bg, title, value, desc }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 14, padding: '20px',
      border: '1px solid #e8ede8', display: 'flex', gap: 14, alignItems: 'flex-start'
    }}>
      <div style={{
        width: 42, height: 42, borderRadius: 12, background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <Icon size={19} color={color} />
      </div>
      <div>
        <div style={{ fontSize: '0.72rem', color: '#7a917b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>
          {title}
        </div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.3rem', fontWeight: 800, color: '#0a260d', margin: '2px 0 4px' }}>
          {value}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#5a7a5c', lineHeight: 1.4 }}>{desc}</div>
      </div>
    </div>
  )
}

export default function Analytics() {
  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="page-title">Analytics & AI Insights</div>
            <div className="page-desc">ML-powered predictions and farm performance analytics</div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'linear-gradient(135deg, #f0f7f0, #dceedd)',
            border: '1px solid #b5dab7', borderRadius: 12, padding: '10px 18px'
          }}>
            <Brain size={17} color="#2e7d34" />
            <span style={{ fontSize: '0.82rem', color: '#1e5e23', fontWeight: 600 }}>
              AI Model: Random Forest + LSTM Active
            </span>
            <span style={{
              width: 7, height: 7, borderRadius: '50%', background: '#22c55e',
              boxShadow: '0 0 6px #22c55e', animation: 'pulse 2s infinite'
            }} />
          </div>
        </div>
      </div>

      {/* AI Insight cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 24 }}>
        <InsightCard icon={Target} color="#2e7d34" bg="#f0f7f0" title="Predicted Yield (Tomorrow)" value="1,220 eggs" desc="92% model confidence — based on 10-day LSTM forecast" />
        <InsightCard icon={TrendingUp} color="#3b82f6" bg="#eff6ff" title="Feed Conv. Ratio" value="1.85" desc="5% better than industry average of 2.3 (Klotz et al., 2020)" />
        <InsightCard icon={Zap} color="#f59e0b" bg="#fff7ed" title="Anomaly Score" value="Low Risk" desc="No significant deviations detected in last 24 hrs" />
        <InsightCard icon={Brain} color="#8b5cf6" bg="#f5f3ff" title="Health Alert Status" value="1 Warning" desc="House B humidity above threshold — see sensor data" />
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        {/* 10-day forecast */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">10-Day Egg Yield Forecast</div>
              <div className="chart-subtitle">LSTM neural network predictions with confidence intervals</div>
            </div>
            <span className="badge badge-blue">AI Predicted</span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={forecastData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f5f0" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#7a917b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#7a917b' }} axisLine={false} tickLine={false} domain={[1000, 1400]} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="predicted" stroke="#2e7d34" strokeWidth={2.5}
                fill="url(#forecastGrad)" name="Predicted Eggs" />
              <defs>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2e7d34" stopOpacity={0.12} />
                  <stop offset="95%" stopColor="#2e7d34" stopOpacity={0.01} />
                </linearGradient>
              </defs>
            </ComposedChart>
          </ResponsiveContainer>

          {/* Confidence legend */}
          <div style={{ display: 'flex', gap: 16, marginTop: 12, paddingTop: 12, borderTop: '1px solid #f0f5f0' }}>
            <div style={{ fontSize: '0.75rem', color: '#5a7a5c' }}>
              <span style={{ fontWeight: 600, color: '#0a260d' }}>Start confidence:</span> 92%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#5a7a5c' }}>
              <span style={{ fontWeight: 600, color: '#0a260d' }}>End confidence:</span> 70%
            </div>
            <div style={{ fontSize: '0.75rem', color: '#5a7a5c' }}>
              <span style={{ fontWeight: 600, color: '#0a260d' }}>Avg predicted:</span> 1,234 eggs/day
            </div>
          </div>
        </div>

        {/* Feed conversion */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Feed Conversion Ratio (FCR)</div>
              <div className="chart-subtitle">Weekly FCR vs industry benchmark (2.3)</div>
            </div>
            <span className="badge badge-green">Below benchmark ↓</span>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={feedConversionData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f5f0" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#7a917b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7a917b' }} axisLine={false} tickLine={false} domain={[0, 3]} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '0.75rem', paddingTop: 12 }} />
              <Bar dataKey="ratio" name="SmartPoultry FCR" fill="#84be88" radius={[6, 6, 0, 0]} />
              <Bar dataKey="industry" name="Industry Avg" fill="#fca5a5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sensor trend row */}
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <div className="chart-title">Environmental Trend — All Houses (Today)</div>
            <div className="chart-subtitle">Temperature, humidity, and ammonia readings across the day</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <span className="badge badge-red">Temp</span>
            <span className="badge badge-blue">Humidity</span>
            <span className="badge badge-amber">Ammonia</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={sensorData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f5f0" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#7a917b' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#7a917b' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: '0.75rem', paddingTop: 12 }} />
            <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={2} dot={false} name="Temperature (°C)" />
            <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2} dot={false} name="Humidity (%)" />
            <Line type="monotone" dataKey="ammonia" stroke="#f59e0b" strokeWidth={2} dot={false} name="Ammonia (ppm)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Model info */}
      <div style={{
        marginTop: 16,
        background: 'linear-gradient(135deg, #0a260d, #174d1c)',
        borderRadius: 16, padding: '24px 28px',
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center'
      }}>
        <div>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#fff', fontSize: '1rem', marginBottom: 6 }}>
            AI Model Details
          </div>
          <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, maxWidth: 600 }}>
            SmartPoultry uses a <strong style={{ color: '#84be88' }}>Random Forest Classifier</strong> for health anomaly detection (trained on behavioral data — Ahmed et al., 2023 approach, 98% accuracy benchmark),
            an <strong style={{ color: '#84be88' }}>LSTM neural network</strong> for 10-day yield forecasting, and
            an <strong style={{ color: '#84be88' }}>Isolation Forest</strong> for unsupervised environmental anomaly detection.
            All models are served via a Python FastAPI microservice.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
          {[
            { label: 'Health Detection Accuracy', value: '98%' },
            { label: 'Forecast Horizon', value: '10 days' },
            { label: 'Last Model Retrain', value: '2026-03-10' },
          ].map((m, i) => (
            <div key={i} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {m.label}
              </div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: '#84be88', fontSize: '1rem' }}>
                {m.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
