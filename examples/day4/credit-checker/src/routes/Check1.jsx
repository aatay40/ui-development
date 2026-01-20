import React from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import { useCredit } from '../state/CreditStore.jsx'
import { runCreditCheck1 } from '../api/mockApi.js'

export default function Check1() {
  const { state, dispatch } = useCredit()
  const nav = useNavigate()

  const run = async () => {
    dispatch({ type: 'CHECK1_START' })
    try {
      const res = await runCreditCheck1(state.applicant)
      dispatch({ type: 'CHECK1_SUCCESS', payload: res })
      // Route decision based on outcome:
      if (res.outcome === 'DOCS_REQUIRED') nav('/docs')
      else nav('/decision')
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: { message: e.message || 'Check 1 failed' } })
    }
  }

  return (
    <div>
      <h2 style={{ margin: 0 }}>Credit check (phase 1)</h2>
      <p className="muted">This simulates an API call with latency. Use it to teach useEffect/fetch/axios patterns later.</p>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="muted">Applicant</div>
        <div style={{ fontWeight: 700 }}>{state.applicant.name || '—'}</div>
        <div className="muted">Income: £{state.applicant.income} · County: {state.applicant.county} · CCJ: {String(state.applicant.hasCCJ)}</div>
      </div>

      {state.check1.status === 'PENDING' ? <Spinner label="Running credit check…" /> : null}

      {state.error ? (
        <div style={{ marginTop: 12, padding: 10, border: '1px solid #fecaca', borderRadius: 10, background: '#fef2f2' }}>
          <div style={{ fontWeight: 700, color: '#991b1b' }}>Error</div>
          <div className="muted">{state.error}</div>
        </div>
      ) : null}

      <div className="row" style={{ marginTop: 16 }}>
        <button className="primary" onClick={run} disabled={state.check1.status === 'PENDING'}>
          Run Check 1
        </button>
        <button onClick={() => nav('/')}>Back</button>
      </div>
    </div>
  )
}