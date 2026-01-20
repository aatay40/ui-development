import React from 'react'

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className="row" style={{ padding: 10 }}>
      <div
        style={{
          width: 16,
          height: 16,
          border: '2px solid #cbd5e1',
          borderTopColor: '#0f172a',
          borderRadius: 999,
          animation: 'spin 1s linear infinite'
        }}
      />
      <div className="muted">{label}</div>

      <style>{`
        @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}