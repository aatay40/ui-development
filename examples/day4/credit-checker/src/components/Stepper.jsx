import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const steps = [
  { path: '/', label: 'Applicant' },
  { path: '/check-1', label: 'Check 1' },
  { path: '/docs', label: 'Documents' },
  { path: '/check-2', label: 'Check 2' },
  { path: '/decision', label: 'Decision' }
]

export default function Stepper() {
  const loc = useLocation()

  return (
    <div className="row" style={{ gap: 8 }}>
      {steps.map((s) => {
        const active = loc.pathname === s.path
        return (
          <span
            key={s.path}
            className="badge"
            style={{
              borderColor: active ? '#0f172a' : '#cbd5e1',
              fontWeight: active ? 800 : 500,
              opacity: active ? 1 : 0.6
            }}
          >
            {s.label}
          </span>
        )
      })}
    </div>
  )
}