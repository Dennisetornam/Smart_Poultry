import { useState } from 'react'
import { Plus, X, Search, Filter, Download } from 'lucide-react'
import { logbookEntries } from '../data/dummy'

function AddEntryModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div>
            <div className="modal-title">Add Logbook Entry</div>
            <div className="modal-subtitle">Record today's farm activity data</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7a917b' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
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

        <div style={{ height: 16 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Feed Used (kg)</label>
            <input className="form-input" type="number" placeholder="e.g. 480" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Egg Count</label>
            <input className="form-input" type="number" placeholder="e.g. 1200" />
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Mortality Count</label>
            <input className="form-input" type="number" placeholder="e.g. 2" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Expenses (GHS)</label>
            <input className="form-input" type="number" placeholder="e.g. 1200" />
          </div>
        </div>

        <div style={{ height: 16 }} />

        <div className="form-group">
          <label className="form-label">Health & Notes</label>
          <textarea
            className="form-input"
            rows={3}
            placeholder="Any observations, vet visits, environmental issues..."
            style={{ resize: 'vertical' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Water Consumption (L)</label>
            <input className="form-input" type="number" placeholder="e.g. 320" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Sales (GHS)</label>
            <input className="form-input" type="number" placeholder="e.g. 2400" />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 28 }}>
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
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all')

  const filtered = logbookEntries.filter(e =>
    e.batch.toLowerCase().includes(search.toLowerCase()) ||
    e.date.includes(search)
  )

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="page-title">Farm Logbook</div>
            <div className="page-desc">Daily farm activity records — all batches</div>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={16} />
            Add Entry
          </button>
        </div>
      </div>

      {/* Summary row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Total Entries', value: '247', sub: 'This season' },
          { label: 'Avg Daily Eggs', value: '1,133', sub: 'Last 7 days' },
          { label: 'Total Mortality', value: '9', sub: 'Last 7 days' },
          { label: 'Total Expenses', value: 'GHS 7,750', sub: 'Last 7 days' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 12, padding: '16px 20px',
            border: '1px solid #e8ede8'
          }}>
            <div style={{ fontSize: '0.7rem', color: '#7a917b', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 500 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: '#0a260d', margin: '4px 0 2px' }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#aabfab' }}>{s.sub}</div>
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
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
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
              display: 'flex', alignItems: 'center', gap: 8,
              background: '#f4f6f3', border: '1px solid #e2e8e2',
              borderRadius: 9, padding: '7px 12px'
            }}>
              <Search size={13} color="#7a917b" />
              <input
                placeholder="Search entries..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  border: 'none', background: 'transparent', outline: 'none',
                  fontSize: '0.78rem', color: '#2a3f2b', width: 140,
                  fontFamily: 'DM Sans, sans-serif'
                }}
              />
            </div>

            <button className="btn-outline" style={{ padding: '7px 14px', fontSize: '0.78rem' }}>
              <Download size={14} />
              Export CSV
            </button>
          </div>
        </div>

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
                <td style={{ fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: '#2e7d34' }}>
                  {entry.id}
                </td>
                <td style={{ color: '#5a7a5c', fontSize: '0.82rem' }}>{entry.date}</td>
                <td>
                  <span className={`badge ${entry.batch.includes('Broiler') ? 'badge-green' : entry.batch.includes('Layer') ? 'badge-blue' : 'badge-amber'}`}>
                    {entry.batch}
                  </span>
                </td>
                <td>{entry.feeding}</td>
                <td style={{ fontWeight: 600 }}>{entry.eggs.toLocaleString()}</td>
                <td>
                  <span className={`badge ${entry.mortality === 0 ? 'badge-green' : entry.mortality <= 2 ? 'badge-amber' : 'badge-red'}`}>
                    {entry.mortality} deaths
                  </span>
                </td>
                <td>{entry.expenses}</td>
                <td style={{ color: '#7a917b', fontSize: '0.8rem' }}>{entry.notes}</td>
                <td><span className="badge badge-green">Verified</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination placeholder */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '16px 0 4px', borderTop: '1px solid #f0f5f0', marginTop: 8
        }}>
          <span style={{ fontSize: '0.78rem', color: '#7a917b' }}>
            Showing {filtered.length} of 247 entries
          </span>
          <div style={{ display: 'flex', gap: 6 }}>
            {['←', '1', '2', '3', '...', '35', '→'].map((p, i) => (
              <button key={i} style={{
                width: 30, height: 30, borderRadius: 8,
                border: p === '1' ? '1.5px solid #2e7d34' : '1px solid #e2e8e2',
                background: p === '1' ? '#f0f7f0' : '#fff',
                color: p === '1' ? '#1e5e23' : '#5a7a5c',
                fontSize: '0.78rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
              }}>{p}</button>
            ))}
          </div>
        </div>
      </div>

      {showModal && <AddEntryModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
