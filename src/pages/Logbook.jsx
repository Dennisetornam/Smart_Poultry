import { useState } from 'react'
import { Plus, X, Search, Download } from 'lucide-react'
import { logbookEntries } from '../data/dummy'

function AddEntryModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <div className="modal-title">Add Logbook Entry</div>
            <div className="modal-subtitle">Record today's farm activity data</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8da58f' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Date</label>
            <input className="form-input" type="date" defaultValue="2026-03-12" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Batch / House</label>
            <select className="form-select">
              <option>Batch A - Broilers</option>
              <option>Batch B - Layers</option>
              <option>Batch C - Noilers</option>
            </select>
          </div>
        </div>

        <div style={{ height: 14 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Feed Used (kg)</label>
            <input className="form-input" type="number" placeholder="e.g. 480" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Egg Count</label>
            <input className="form-input" type="number" placeholder="e.g. 1200" />
          </div>
        </div>

        <div style={{ height: 14 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Mortality Count</label>
            <input className="form-input" type="number" placeholder="e.g. 2" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Expenses (GHS)</label>
            <input className="form-input" type="number" placeholder="e.g. 1200" />
          </div>
        </div>

        <div style={{ height: 14 }} />

        <div className="form-group">
          <label className="form-label">Health & Notes</label>
          <textarea
            className="form-input"
            rows={3}
            placeholder="Any observations, vet visits, environmental issues..."
            style={{ resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Water Consumption (L)</label>
            <input className="form-input" type="number" placeholder="e.g. 320" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Sales (GHS)</label>
            <input className="form-input" type="number" placeholder="e.g. 2400" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            Save Entry
          </button>
          <button className="btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function Logbook() {
  const [showModal, setShowModal] = useState(false)
  const [search, setSearch]       = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filtered = logbookEntries.filter(e => {
    const matchSearch = (
      e.batch.toLowerCase().includes(search.toLowerCase()) ||
      e.date.includes(search)
    )
    const matchTab =
      activeTab === 'all'      ? true :
      activeTab === 'broilers' ? e.batch.toLowerCase().includes('broiler') :
      activeTab === 'layers'   ? e.batch.toLowerCase().includes('layer')   :
      activeTab === 'noilers'  ? e.batch.toLowerCase().includes('noiler')  : true
    return matchSearch && matchTab
  })

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="page-title">Farm Logbook</div>
            <div className="page-desc">Daily farm activity records — all batches</div>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} />
            Add Entry
          </button>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        {[
          { label: 'Total Entries',   value: '247',        sub: 'This season'  },
          { label: 'Avg Daily Eggs',  value: '1,133',      sub: 'Last 7 days'  },
          { label: 'Total Mortality', value: '9',          sub: 'Last 7 days'  },
          { label: 'Total Expenses',  value: 'GHS 7,750',  sub: 'Last 7 days'  },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 12, padding: '15px 18px',
            border: '1px solid #dddabd'
          }}>
            <div style={{ fontSize: '0.68rem', color: '#8da58f', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.35rem', fontWeight: 700, color: '#0d1f0e', margin: '4px 0 2px' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#8da58f' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className="chart-card">
        <div className="chart-header">
          <div>
            <div className="chart-title">Log Entries</div>
            <div className="chart-subtitle">{filtered.length} records found</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            {/* Tabs */}
            <div className="filter-tabs">
              {['all', 'broilers', 'layers', 'noilers'].map(t => (
                <button key={t} className={`filter-tab${activeTab === t ? ' active' : ''}`}
                  onClick={() => setActiveTab(t)}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              background: '#F7F6E5', border: '1.5px solid #dddabd',
              borderRadius: 9, padding: '6px 11px'
            }}>
              <Search size={13} color="#8da58f" />
              <input
                placeholder="Search entries..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  border: 'none', background: 'transparent', outline: 'none',
                  fontSize: '0.78rem', color: '#2a3d2b', width: 130,
                  fontFamily: 'Inter, sans-serif'
                }}
              />
            </div>

            <button className="btn-outline" style={{ padding: '6px 13px', fontSize: '0.78rem' }}>
              <Download size={13} />
              Export CSV
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Entry ID</th>
                <th>Date</th>
                <th>Batch / House</th>
                <th>Feed Used</th>
                <th>Egg Count</th>
                <th>Mortality</th>
                <th>Expenses</th>
                <th>Notes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(entry => (
                <tr key={entry.id}>
                  <td style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: '#237227' }}>
                    {entry.id}
                  </td>
                  <td style={{ color: '#5e7a61', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{entry.date}</td>
                  <td>
                    <span className={`badge ${entry.batch.includes('Broiler') ? 'badge-green' : entry.batch.includes('Layer') ? 'badge-blue' : 'badge-amber'}`}>
                      {entry.batch}
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{entry.feeding}</td>
                  <td style={{ fontWeight: 600 }}>{entry.eggs.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${entry.mortality === 0 ? 'badge-green' : entry.mortality <= 2 ? 'badge-amber' : 'badge-red'}`}>
                      {entry.mortality} deaths
                    </span>
                  </td>
                  <td style={{ whiteSpace: 'nowrap' }}>{entry.expenses}</td>
                  <td className="td-notes" title={entry.notes}>{entry.notes}</td>
                  <td><span className="badge badge-green">Verified</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 0 2px', borderTop: '1px solid #edebd6', marginTop: 6
        }}>
          <span style={{ fontSize: '0.77rem', color: '#8da58f' }}>
            Showing {filtered.length} of {logbookEntries.length} entries
          </span>
          <div style={{ display: 'flex', gap: 5 }}>
            {['←', '1', '2', '3', '...', '35', '→'].map((p, i) => (
              <button key={i} style={{
                width: 30, height: 30, borderRadius: 7,
                border: p === '1' ? '1.5px solid #237227' : '1px solid #dddabd',
                background: p === '1' ? 'rgba(35,114,39,0.08)' : '#fff',
                color: p === '1' ? '#237227' : '#5e7a61',
                fontSize: '0.77rem', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                fontWeight: p === '1' ? 600 : 400
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {showModal && <AddEntryModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
