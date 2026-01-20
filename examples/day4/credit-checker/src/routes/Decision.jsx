import React from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import { useCredit } from '../state/CreditStore.jsx'
import { fetchAgreement } from '../api/mockApi.js'
import { RequireCheck1Done } from '../components/Guard.jsx'

export default function Decision() {
  return (
    <RequireCheck1Done>
      <DecisionInner />
    </RequireCheck1Done>
  )
}

function DecisionInner() {
  const { state, dispatch } = useCredit()
  const nav = useNavigate()

  const finalOutcome =
    state.check2.status === 'DONE'
      ? state.check2.outcome
      : state.check1.outcome

  const reason =
    state.check2.status === 'DONE'
      ? state.check2.reason
      : state.check1.reason

  const needsAgreement = finalOutcome === 'APPROVED'

  const getAgreement = async () => {
    dispatch({ type: 'AGREEMENT_START' })
    try {
      const res = await fetchAgreement({ applicantName: state.applicant.name })
      dispatch({ type: 'AGREEMENT_SUCCESS', payload: { agreementId: res.agreementId } })
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: { message: e.message || 'Agreement fetch failed' } })
    }
  }

  return (
    <div>
      <h2 style={{ margin: 0 }}>Decision</h2>
      <p className="muted">Final outcome based on phase 1 or phase 2.</p>

      <div className="card" style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>
          {finalOutcome === 'APPROVED' ? '✅ Approved' : finalOutcome === 'DENIED' ? '❌ Denied' : '📄 Documents required'}
        </div>
        <div className="muted" style={{ marginTop: 6 }}>Reason: {reason || '—'}</div>
      </div>

      {needsAgreement ? (
        <div className="card" style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700 }}>Agreement</div>
          <div className="muted">
            In a real app, this would be a PDF or a link from the backend.
          </div>

          {state.agreement.status === 'PENDING' ? <Spinner label="Preparing agreement…" /> : null}

          {state.agreement.status === 'DONE' ? (
            <div className="row" style={{ marginTop: 10 }}>
              <span className="badge">Agreement ID: {state.agreement.agreementId}</span>
              <span className="muted">Applicant: {state.applicant.name}</span>
            </div>
          ) : null}

          <div className="row" style={{ marginTop: 12 }}>
            <button className="primary" onClick={getAgreement} disabled={state.agreement.status === 'PENDING'}>
              Fetch agreement
            </button>
          </div>
        </div>
      ) : null}

      {state.error ? (
        <div style={{ marginTop: 12, padding: 10, border: '1px solid #fecaca', borderRadius: 10, background: '#fef2f2' }}>
          <div style={{ fontWeight: 700, color: '#991b1b' }}>Error</div>
          <div className="muted">{state.error}</div>
        </div>
      ) : null}

      <div className="row" style={{ marginTop: 16 }}>
        <button onClick={() => nav('/')}>Back to start</button>
        <button className="danger" onClick={() => dispatch({ type: 'RESET_FLOW' })}>Reset flow</button>
      </div>
    </div>
  )
}