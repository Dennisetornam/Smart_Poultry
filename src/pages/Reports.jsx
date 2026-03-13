import { useState } from 'react'
import { Download, FileText, Calendar, Filter, BarChart2, TrendingUp, Truck, DollarSign } from 'lucide-react'

const reportTypes = [
  { id: 'production', icon: BarChart2, label: 'Production Report', desc: 'Egg yield, feed used, mortality trends', color: '#2e7d34', bg: '#f0f7f0' },
  { id: 'financial', icon: DollarSign, label: 'Financial Report', desc: 'Expenses, revenue, profit margins', color: '#8b5cf6', bg: '#f5f3ff' },
  { id: 'delivery', icon: Truck, label: 'Delivery Report', desc: 'Order history, delivery performance', color: '#3b82f6', bg: '#eff6ff' },
  { id: 'analytics', icon: TrendingUp, label: 'AI Analytics Report', desc: 'Forecast accuracy, model insights', color: '#f59e0b', bg: '#fff7ed' },
]

const recentReports = [
  { name: 'Weekly Production Summary', type: 'Production', date: '2026-03-10', format: 'PDF', size: '1.2 MB' },
  { name: 'February Financial Report', type: 'Financial', date: '2026-03-01', format: 'CSV', size: '340 KB' },
  { name: 'Delivery Performance Q1', type: 'Delivery', date: '2026-02-28', format: 'PDF', size: '2.1 MB' },
  { name: 'Batch A Mortality Analysis', type: 'Production', date: '2026-02-20', format: 'PDF', size: '890 KB' },
  { name: 'FCR Benchmark Report', type: 'Analytics', date: '2026-02-15', format: 'PDF', size: '1.5 MB' },
]

export default function Reports() {
  const [selectedType, setSelectedType] = useState('production')
  const [dateRange, setDateRange] = useState('week')
  const [format, setFormat] = useState('pdf')

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Reports</div>
        <div className="page-desc">Generate, download, and schedule farm performance reports</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 20 }}>
        {/* Report generator */}
        <div>
          {/* Report type selection */}
          <div className="chart-card" style={{ marginBottom: 16 }}>
            <div className="section-header">
              <div>
                <div className="section-title">Report Type</div>
                <div className="section-sub">Select the type of report to generate</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {reportTypes.map(r => (
                <div
                  key={r.id}
                  onClick={() => setSelectedType(r.id)}
                  style={{
                    padding: '16px', borderRadius: 12, cursor: 'pointer',
                    border: selectedType === r.id ? `1.5px solid ${r.color}` : '1.5px solid #e8ede8',
                    background: selectedType === r.id ? r.bg : '#fff',
                    transition: 'all 0.15s', display: 'flex', gap: 14, alignItems: 'flex-start'
                  }}
                >
                  <div style={{
                    width: 38, height: 38, borderRadius: 10, background: r.bg,
                    border: `1px solid ${r.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <r.icon size={17} color={r.color} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0a260d' }}>{r.label}</div>
                    <div style={{ fontSize: '0.73rem', color: '#7a917b', marginTop: 2 }}>{r.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="chart-card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Report Parameters</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Date Range</label>
                <select className="form-select" value={dateRange} onChange={e => setDateRange(e.target.value)}>
                  <option value="week">Last 7 Days</option>
                  <option value="month">Last 30 Days</option>
                  <option value="quarter">This Quarter</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Batch / House</label>
                <select className="form-select">
                  <option>All Batches</option>
                  <option>Batch A - Broilers</option>
                  <option>Batch B - Layers</option>
                  <option>Batch C - Noilers</option>
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Export Format</label>
                <select className="form-select" value={format} onChange={e => setFormat(e.target.value)}>
                  <option value="pdf">PDF Document</option>
                  <option value="csv">CSV Spreadsheet</option>
                  <option value="excel">Excel (.xlsx)</option>
                </select>
              </div>
            </div>

            {dateRange === 'custom' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">From Date</label>
                  <input className="form-input" type="date" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">To Date</label>
                  <input className="form-input" type="date" />
                </div>
              </div>
            )}
          </div>

          {/* Include sections */}
          <div className="chart-card" style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 14 }}>Include Sections</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                'Egg Production Summary', 'Feed & Water Consumption',
                'Mortality Analysis', 'Environmental Data',
                'AI Forecast Comparison', 'Financial Overview',
                'Delivery Performance', 'Audit Logs'
              ].map((s, i) => (
                <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" defaultChecked={i < 4} style={{ accentColor: '#2e7d34', width: 15, height: 15 }} />
                  <span style={{ fontSize: '0.82rem', color: '#3a5e3c' }}>{s}</span>
                </label>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '13px' }}>
              <Download size={16} />
              Generate & Download Report
            </button>
            <button className="btn-outline">
              <Calendar size={15} />
              Schedule Auto-Report
            </button>
          </div>
        </div>

        {/* Recent reports & audit log */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Recent reports */}
          <div className="chart-card">
            <div className="section-title" style={{ marginBottom: 14 }}>Recent Reports</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {recentReports.map((r, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '11px 0', borderBottom: i < recentReports.length - 1 ? '1px solid #f0f5f0' : 'none'
                }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 8, background: '#f0f7f0',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      <FileText size={15} color="#2e7d34" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#0a260d' }}>{r.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#7a917b' }}>{r.date} · {r.size}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <span className="badge badge-gray" style={{ fontSize: '0.65rem' }}>{r.format}</span>
                    <button style={{
                      background: 'none', border: 'none', cursor: 'pointer', color: '#2e7d34'
                    }}>
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance / Audit log */}
          <div className="chart-card">
            <div className="section-title" style={{ marginBottom: 14 }}>Audit Log</div>
            {[
              { action: 'Report generated', user: 'Akpalolo D.', time: '2 hrs ago' },
              { action: 'Log entry added', user: 'Benedict O.', time: '4 hrs ago' },
              { action: 'Delivery updated', user: 'Kenneth M.', time: '6 hrs ago' },
              { action: 'User login', user: 'Akpalolo D.', time: '8 hrs ago' },
            ].map((a, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '9px 0', borderBottom: i < 3 ? '1px solid #f0f5f0' : 'none'
              }}>
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 500, color: '#1a2e1b' }}>{a.action}</div>
                  <div style={{ fontSize: '0.7rem', color: '#7a917b' }}>{a.user}</div>
                </div>
                <div style={{ fontSize: '0.7rem', color: '#aabfab' }}>{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
