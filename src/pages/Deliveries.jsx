import { useState } from 'react'
import { Plus, MapPin, X } from 'lucide-react'
import { deliveries } from '../data/dummy'

const statusColors = {
  'Delivered': 'badge-green',
  'In Transit': 'badge-blue',
  'Pending': 'badge-amber',
  'Cancelled': 'badge-red',
}

function NewDeliveryModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="modal-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <div className="modal-title">Schedule New Delivery</div>
            <div className="modal-subtitle">Create a delivery order and assign a driver</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8da58f' }}>
            <X size={20} />
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Customer Name</label>
          <input className="form-input" placeholder="e.g. Kofi Supermart" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Product Type</label>
            <select className="form-select">
              <option>Eggs (Crates)</option>
              <option>Broilers (Live)</option>
              <option>Broilers (Frozen)</option>
              <option>Noilers (Live)</option>
            </select>
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Quantity</label>
            <input className="form-input" type="number" placeholder="e.g. 40" />
          </div>
        </div>

        <div style={{ height: 14 }} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Delivery Date</label>
            <input className="form-input" type="date" defaultValue="2026-03-13" />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Assign Driver</label>
            <select className="form-select">
              <option>Unassigned</option>
              <option>Kwame A.</option>
              <option>Emmanuel B.</option>
            </select>
          </div>
        </div>

        <div style={{ height: 14 }} />

        <div className="form-group">
          <label className="form-label">Delivery Address</label>
          <input className="form-input" placeholder="Customer address or GPS coordinates" />
        </div>

        <div className="form-group">
          <label className="form-label">Amount (GHS)</label>
          <input className="form-input" type="number" placeholder="e.g. 2400" />
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea className="form-input" rows={2} placeholder="Special instructions..." style={{ resize: 'none' }} />
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
          <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
            Create Delivery Order
          </button>
          <button className="btn-outline" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function Deliveries() {
  const [showModal, setShowModal] = useState(false)
  const [activeStatus, setActiveStatus] = useState('all')

  const counts = {
    all: deliveries.length,
    pending: deliveries.filter(d => d.status === 'Pending').length,
    transit: deliveries.filter(d => d.status === 'In Transit').length,
    delivered: deliveries.filter(d => d.status === 'Delivered').length,
  }

  const filtered = activeStatus === 'all' ? deliveries
    : activeStatus === 'pending' ? deliveries.filter(d => d.status === 'Pending')
      : activeStatus === 'transit' ? deliveries.filter(d => d.status === 'In Transit')
        : deliveries.filter(d => d.status === 'Delivered')

  return (
    <div>
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="page-title">Delivery Management</div>
            <div className="page-desc">Track and schedule all product deliveries</div>
          </div>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <Plus size={15} />
            New Delivery
          </button>
        </div>
      </div>

      {/* Status summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        {[
          { label: 'Total Orders', value: counts.all, color: '#237227', bg: 'rgba(35,114,39,0.08)' },
          { label: 'Pending', value: counts.pending, color: '#8a5f00', bg: 'rgba(255,170,0,0.12)' },
          { label: 'In Transit', value: counts.transit, color: '#1e40af', bg: 'rgba(59,130,246,0.10)' },
          { label: 'Delivered Today', value: counts.delivered, color: '#065f46', bg: 'rgba(16,185,129,0.10)' },
        ].map((s, i) => (
          <div key={i} style={{
            background: '#fff', borderRadius: 12, padding: '16px 18px',
            border: '1px solid #dddabd', display: 'flex', alignItems: 'center', gap: 12
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10, background: s.bg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: s.color
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#5e7a61', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div>
        {/* Orders table */}
        <div className="chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Delivery Orders</div>
              <div className="chart-subtitle">{filtered.length} orders</div>
            </div>
            <div className="filter-tabs">
              {[
                { key: 'all', label: 'All' },
                { key: 'pending', label: 'Pending' },
                { key: 'transit', label: 'In Transit' },
                { key: 'delivered', label: 'Delivered' },
              ].map(t => (
                <button key={t.key} className={`filter-tab${activeStatus === t.key ? ' active' : ''}`}
                  onClick={() => setActiveStatus(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Driver</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(d => (
                  <tr key={d.id} style={{ cursor: 'pointer' }}>
                    <td style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '0.8rem', color: '#237227', whiteSpace: 'nowrap' }}>
                      {d.id}
                    </td>
                    <td style={{ fontWeight: 500, whiteSpace: 'nowrap' }}>{d.customer}</td>
                    <td style={{ color: '#5e7a61', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{d.product}</td>
                    <td style={{ fontWeight: 600 }}>{d.qty}</td>
                    <td style={{ color: d.driver === 'Unassigned' ? '#8a5f00' : '#5e7a61', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      {d.driver}
                    </td>
                    <td style={{ color: '#5e7a61', fontSize: '0.82rem', whiteSpace: 'nowrap' }}>{d.date}</td>
                    <td style={{ fontWeight: 600, color: '#0d1f0e', whiteSpace: 'nowrap' }}>{d.amount}</td>
                    <td>
                      <span className={`badge ${statusColors[d.status]}`}>{d.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {/* Map panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
          <div className="chart-card" style={{ flex: 1 }}>
            <div className="chart-header" style={{ marginBottom: 12 }}>
              <div>
                <div className="chart-title">Live Tracking Map</div>
                <div className="chart-subtitle">GPS tracking — 1 active delivery</div>
              </div>
            </div>
            <div className="map-placeholder" style={{ height: 180 }}>
              <MapPin size={26} color="#FFAA00" />
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#237227', fontSize: '0.88rem' }}>
                GPS Map View
              </div>
              <div style={{ fontSize: '0.73rem', textAlign: 'center', maxWidth: 165, color: '#5e7a61', lineHeight: 1.5 }}>
                Leaflet.js map integration will show real-time driver locations here
              </div>
            </div>

            {/* Active delivery card */}
            <div style={{
              marginTop: 12, background: 'rgba(35,114,39,0.06)', borderRadius: 10,
              padding: '13px', border: '1px solid rgba(35,114,39,0.16)'
            }}>
              <div style={{ fontSize: '0.68rem', color: '#8da58f', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 7 }}>
                Active Delivery
              </div>
              <div style={{ fontWeight: 600, color: '#0d1f0e', fontSize: '0.84rem', marginBottom: 3 }}>
                DEL-2026-002 · Accra Fresh Market
              </div>
              <div style={{ fontSize: '0.77rem', color: '#5e7a61', marginBottom: 8 }}>
                120 Broilers · Driver: Emmanuel B.
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-blue">In Transit</span>
                <span style={{ fontSize: '0.72rem', color: '#8da58f' }}>ETA: ~25 min</span>
              </div>
            </div>
          </div>

          {/* Revenue summary */}
          <div className="chart-card">
            <div style={{ fontSize: '0.68rem', color: '#8da58f', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12, fontWeight: 600 }}>
              Revenue Summary
            </div>
            {[
              { label: "Today's Revenue", value: 'GHS 5,900' },
              { label: 'Pending Collection', value: 'GHS 13,500' },
              { label: 'Month Total', value: 'GHS 84,200' },
            ].map((r, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '10px 0', borderBottom: i < 2 ? '1px solid #edebd6' : 'none'
              }}>
                <span style={{ fontSize: '0.8rem', color: '#5e7a61' }}>{r.label}</span>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#0d1f0e', fontSize: '0.94rem' }}>
                  {r.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && <NewDeliveryModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
