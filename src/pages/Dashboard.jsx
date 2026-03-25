import { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts'
import { Egg, HeartPulse, PackageCheck, Wheat, TrendingUp, TrendingDown, Thermometer, Droplets, Wind } from 'lucide-react'
import { eggProductionData, alerts, sensorData, mortalityData } from '../data/dummy'

function StatCard({ label, value, change, positive, icon: Icon, iconBg, iconColor, accent }) {
  return (
    <div className="stat-card">
      <div className="card-accent" style={{ background: accent }} />
      <div className="card-icon" style={{ background: iconBg, width: 46, height: 46, borderRadius: 12 }}>
        <Icon size={22} color={iconColor} strokeWidth={1.75} />
      </div>
      <div className="card-label">{label}</div>
      <div className="card-value">{value}</div>
      <div className="card-change" style={{ color: positive ? '#237227' : '#dc2626' }}>
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
        background: '#0d1f0e', color: '#fff', borderRadius: 10,
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
  const now = new Date()
  const dateLabel = now.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Farm Overview</div>
        <div className="page-desc">Today's snapshot — {dateLabel}</div>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 20 }}>
        <StatCard label="Eggs Today"         value="1,240"  change="+4.2% vs yesterday"  positive        icon={Egg}          iconBg="rgba(35,114,39,0.10)"   iconColor="#237227" accent="#237227" />
        <StatCard label="Mortality Rate"     value="0.08%"  change="+0.02% vs yesterday" positive={false} icon={HeartPulse}   iconBg="rgba(255,170,0,0.13)"   iconColor="#e09600" accent="#FFAA00" />
        <StatCard label="Pending Deliveries" value="2"      change="GHS 13,500 value"     positive        icon={PackageCheck} iconBg="rgba(59,130,246,0.10)"  iconColor="#3b82f6" accent="#3b82f6" />
        <StatCard label="Feed Used (Today)"  value="480 kg" change="-1.2% vs avg"         positive        icon={Wheat}        iconBg="rgba(132,190,136,0.18)" iconColor="#237227" accent="#84be88" />
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 14, marginBottom: 14 }}>
        {/* Egg production chart */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Egg Production — Last 7 Days</div>
              <div className="chart-subtitle">Daily count vs target (1,200 eggs)</div>
            </div>
            <span className="badge badge-green">↑ 3.7% avg</span>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={eggProductionData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eceacc" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#8da58f' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8da58f' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={1200} stroke="#FFAA00" strokeDasharray="4 4" label={{ value: 'Target', fontSize: 10, fill: '#FFAA00' }} />
              <Line type="monotone" dataKey="eggs" stroke="#237227" strokeWidth={2.5} dot={{ r: 4, fill: '#237227' }} name="Eggs" />
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
          <div style={{ overflowY: 'auto', maxHeight: 210 }}>
            {alerts.map(alert => (
              <div key={alert.id} className="alert-item">
                <span className="alert-dot" style={{ background: alert.color }} />
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0d1f0e', marginBottom: 2 }}>
                    {alert.title}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#5e7a61', lineHeight: 1.45 }}>
                    {alert.message}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#8da58f', marginTop: 3 }}>
                    {alert.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 14 }}>
            {[
              { label: 'Temperature', value: '29°C',   icon: Thermometer, color: '#ef4444', ok: true  },
              { label: 'Humidity',    value: '76%',    icon: Droplets,    color: '#3b82f6', ok: false },
              { label: 'Ammonia',     value: '17 ppm', icon: Wind,        color: '#FFAA00', ok: true  },
            ].map((s, i) => (
              <div key={i} style={{
                background: '#F7F6E5', borderRadius: 10,
                padding: '11px 12px', border: '1px solid #dddabd',
                display: 'flex', flexDirection: 'column', gap: 5
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <s.icon size={14} color={s.color} />
                  <span className={`badge ${s.ok ? 'badge-green' : 'badge-amber'}`} style={{ fontSize: '0.60rem', padding: '1px 6px' }}>
                    {s.ok ? 'OK' : 'HIGH'}
                  </span>
                </div>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.05rem', fontWeight: 700, color: '#0d1f0e' }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.68rem', color: '#8da58f' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <ResponsiveContainer width="100%" height={110}>
            <LineChart data={sensorData} margin={{ top: 0, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eceacc" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#8da58f' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#8da58f' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="temp"     stroke="#ef4444" strokeWidth={1.5} dot={false} name="Temp °C" />
              <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="Humidity %" />
              <Line type="monotone" dataKey="ammonia"  stroke="#FFAA00" strokeWidth={1.5} dot={false} name="Ammonia ppm" />
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
          <ResponsiveContainer width="100%" height={195}>
            <BarChart data={mortalityData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eceacc" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#8da58f' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#8da58f' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" fill="#fca5a5" radius={[6, 6, 0, 0]} name="Deaths" />
            </BarChart>
          </ResponsiveContainer>

          <div style={{
            marginTop: 10, padding: '9px 13px',
            background: 'rgba(255,170,0,0.10)', borderRadius: 9,
            border: '1px solid rgba(255,170,0,0.25)', fontSize: '0.77rem', color: '#8a5f00',
            lineHeight: 1.5
          }}>
            ⚠️ Week 3 spike linked to temperature anomaly on 2026-02-20. Vet visit recommended.
          </div>
        </div>
      </div>
    </div>
  )
}
