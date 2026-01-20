import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCredit } from '../state/CreditStore.jsx'

export default function Home() {
  const { state, dispatch } = useCredit()
  const nav = useNavigate()
  const a = state.applicant

  const start = () => {
    // Simple validation
    if (!a.name.trim()) {
      dispatch({ type: 'SET_ERROR', payload: { message: 'Name is required' } })
      return
    }
    nav('/check-1')
  }

  return (
    <div>
      <h2 style={{ margin: 0 }}>Applicant details</h2>
      <p className="muted">
        UK-style flow: we run an initial credit check. If needed, we request documents, then run a second check.
      </p>

      <div className="row" style={{ marginTop: 12 }}>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div className="muted">Name</div>
          <input
            value={a.name}
            onChange={(e) =>
              dispatch({ type: 'SET_APPLICANT_FIELD', payload: { field: 'name', value: e.target.value } })
            }
            placeholder="e.g., Alice Smith"
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ width: 200 }}>
          <div className="muted">Income (£)</div>
          <input
            type="number"
            value={a.income}
            onChange={(e) =>
              dispatch({ type: 'SET_APPLICANT_FIELD', payload: { field: 'income', value: Number(e.target.value) } })
            }
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ width: 200 }}>
          <div className="muted">County</div>
          <select
            value={a.county}
            onChange={(e) =>
              dispatch({ type: 'SET_APPLICANT_FIELD', payload: { field: 'county', value: e.target.value } })
            }
            style={{ width: '100%' }}
          >
            <option value="London">London</option>
            <option value="Manchester">Manchester</option>
            <option value="Birmingham">Birmingham</option>
            <option value="HighRisk">HighRisk (demo)</option>
          </select>
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <label className="row" style={{ gap: 8 }}>
          <input
            type="checkbox"
            checked={a.hasCCJ}
            onChange={(e) =>
              dispatch({ type: 'SET_APPLICANT_FIELD', payload: { field: 'hasCCJ', value: e.target.checked } })
            }
          />
          <span className="muted">Has CCJ (demo toggle)</span>
        </label>
      </div>

      {state.error ? (
        <div style={{ marginTop: 12, padding: 10, border: '1px solid #fecaca', borderRadius: 10, background: '#fef2f2' }}>
          <div style={{ fontWeight: 700, color: '#991b1b' }}>Error</div>
          <div className="muted">{state.error}</div>
        </div>
      ) : null}

      <div className="row" style={{ marginTop: 16 }}>
        <button className="primary" onClick={start}>Continue to Check 1</button>
        <button onClick={() => dispatch({ type: 'RESET_FLOW' })}>Reset</button>
      </div>
    </div>
  )
}