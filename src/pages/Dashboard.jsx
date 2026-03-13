import { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, ReferenceLine
} from 'recharts'
import { Egg, TrendingUp, TrendingDown, AlertTriangle, Truck, Thermometer, Droplets, Wind } from 'lucide-react'
import { eggProductionData, alerts, sensorData, mortalityData } from '../data/dummy'

function StatCard({ label, value, change, positive, icon: Icon, iconBg, iconColor, accent }) {
  return (
    <div className="stat-card">
      <div className="card-accent" style={{ background: accent }} />
      <div className="card-icon" style={{ background: iconBg }}>
        <Icon size={20} color={iconColor} />
      </div>
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
      <div className="card-change" style={{ color: positive ? '#16a34a' : '#dc2626' }}>
        {positive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        {change}
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: '#0a260d', color: '#fff', borderRadius: 10,
        padding: '10px 14px', fontSize: '0.78rem', boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color }}>
            {p.name}: {p.value.toLocaleString()}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">Farm Overview</div>
        <div className="page-desc">Today's snapshot — Thursday, 12 March 2026</div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
        <StatCard label="Eggs Today" value="1,240" change="+4.2% vs yesterday" positive icon={Egg} iconBg="#f0f7f0" iconColor="#2e7d34" accent="#2e7d34" />
        <StatCard label="Mortality Rate" value="0.08%" change="+0.02% vs yesterday" positive={false} icon={AlertTriangle} iconBg="#fff7ed" iconColor="#f59e0b" accent="#f59e0b" />
        <StatCard label="Pending Deliveries" value="2" change="GHS 13,500 value" positive icon={Truck} iconBg="#eff6ff" iconColor="#3b82f6" accent="#3b82f6" />
        <StatCard label="Feed Used (Today)" value="480 kg" change="-1.2% vs avg" positive icon={TrendingUp} iconBg="#f0fdf4" iconColor="#16a34a" accent="#16a34a" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Egg production chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Egg Production — Last 7 Days</div>
              <div className="chart-subtitle">Daily count vs target (1,200 eggs)</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <span className="badge badge-green">↑ 3.7% avg</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={eggProductionData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f5f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#7a917b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7a917b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={1200} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: 'Target', fontSize: 10, fill: '#f59e0b' }} />
              <Line type="monotone" dataKey="eggs" stroke="#2e7d34" strokeWidth={2.5} dot={{ r: 4, fill: '#2e7d34' }} name="Eggs" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Alerts panel */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Live Alerts</div>
              <div className="chart-subtitle">{alerts.length} active notifications</div>
            </div>
            <span className="badge badge-red">{alerts.filter(a => a.type === 'error').length} Critical</span>
          </div>
          <div style={{ overflowY: 'auto', maxHeight: 220 }}>
            {alerts.map(alert => (
              <div key={alert.id} className="alert-item">
                <span className="alert-dot" style={{ background: alert.color }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a2e1b', marginBottom: 2 }}>
                    {alert.title}
                  </div>
                  <div style={{ fontSize: '0.73rem', color: '#7a917b', lineHeight: 1.4 }}>
                    {alert.message}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#aabfab', marginTop: 3 }}>
                    {alert.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Sensor cards */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Environmental Sensors — House A</div>
              <div className="chart-subtitle">Today's readings over time</div>
            </div>
            <span className="badge badge-green">All sensors online</span>
          </div>

          {/* Current readings */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
            {[
              { label: 'Temperature', value: '29°C', icon: Thermometer, color: '#ef4444', ok: true },
              { label: 'Humidity', value: '76%', icon: Droplets, color: '#3b82f6', ok: false },
              { label: 'Ammonia', value: '17 ppm', icon: Wind, color: '#f59e0b', ok: true },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#fafcfa', borderRadius: 10,
                padding: '12px', border: '1px solid #e8ede8',
                display: 'flex', flexDirection: 'column', gap: 6
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <s.icon size={14} color={s.color} />
                  <span className={`badge ${s.ok ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '0.62rem', padding: '1px 7px' }}>
                    {s.ok ? 'OK' : 'HIGH'}
                  </span>
                </div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: '#0a260d' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#7a917b' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={sensorData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f5f0" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#aabfab' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#aabfab' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={1.5} dot={false} name="Temp °C" />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="Humidity %" />
              <Line type="monotone" dataKey="ammonia" stroke="#f59e0b" strokeWidth={1.5} dot={false} name="Ammonia ppm" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mortality trend */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Weekly Mortality Trend</div>
              <div className="chart-subtitle">Deaths per week across all batches</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={mortalityData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f5f0" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#7a917b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#7a917b' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#fca5a5" radius={[6, 6, 0, 0]} name="Deaths" />
            </BarChart>
          </ResponsiveContainer>

          <div style={{
            marginTop: 12, padding: '10px 14px',
            background: '#fff7ed', borderRadius: 10,
            border: '1px solid #fed7aa', fontSize: '0.78rem', color: '#92400e'
          }}>
            ⚠️ Week 3 spike linked to temperature anomaly on 2026-02-20. Vet visit recommended.
          </div>
        </div>
      </div>
    </div>
  )
}
