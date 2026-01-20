import React from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import { useCredit } from '../state/CreditStore.jsx'
import { runCreditCheck2 } from '../api/mockApi.js'
import { RequireCheck1Done, RequireDocsIfNeeded } from '../components/Guard.jsx'

export default function Check2() {
  return (
    <RequireCheck1Done>
      <RequireDocsIfNeeded>
        <Check2Inner />
      </RequireDocsIfNeeded>
    </RequireCheck1Done>
  )
}

function Check2Inner() {
  const { state, dispatch } = useCredit()
  const nav = useNavigate()

  const run = async () => {
    dispatch({ type: 'CHECK2_START' })
    try {
      const res = await runCreditCheck2({ docsUploaded: state.docs.uploaded })
      dispatch({ type: 'CHECK2_SUCCESS', payload: res })
      nav('/decision')
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: { message: e.message || 'Check 2 failed' } })
    }
  }

  return (
    <div>
      <h2 style={{ margin: 0 }}>Credit check (phase 2)</h2>
      <p className="muted">Second check after docs. This is guarded: you can’t reach it if docs are required but not uploaded.</p>

      <div className="card" style={{ marginTop: 12 }}>
        <div className="muted">Docs uploaded: {String(state.docs.uploaded)}</div>
        {state.docs.uploaded ? (
          <div className="muted">Files: {state.docs.files.join(', ')}</div>
        ) : null}
      </div>

      {state.check2.status === 'PENDING' ? <Spinner label="Running second check…" /> : null}

      {state.error ? (
        <div style={{ marginTop: 12, padding: 10, border: '1px solid #fecaca', borderRadius: 10, background: '#fef2f2' }}>
          <div style={{ fontWeight: 700, color: '#991b1b' }}>Error</div>
          <div className="muted">{state.error}</div>
        </div>
      ) : null}

      <div className="row" style={{ marginTop: 16 }}>
        <button className="primary" onClick={run} disabled={state.check2.status === 'PENDING'}>
          Run Check 2
        </button>
        <button onClick={() => nav('/docs')}>Back</button>
      </div>
    </div>
  )
}