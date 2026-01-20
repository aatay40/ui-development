import React from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.jsx'
import { useCredit } from '../state/CreditStore.jsx'
import { uploadDocuments } from '../api/mockApi.js'
import { RequireCheck1Done } from '../components/Guard.jsx'

export default function DocsUpload() {
  return (
    <RequireCheck1Done>
      <DocsUploadInner />
    </RequireCheck1Done>
  )
}

function DocsUploadInner() {
  const { state, dispatch } = useCredit()
  const nav = useNavigate()
  const [pending, setPending] = React.useState(false)

  const upload = async () => {
    setPending(true)
    try {
      const res = await uploadDocuments()
      dispatch({ type: 'DOCS_UPLOADED', payload: { files: res.received } })
      nav('/check-2')
    } catch (e) {
      dispatch({ type: 'SET_ERROR', payload: { message: e.message || 'Upload failed' } })
    } finally {
      setPending(false)
    }
  }

  const required = state.check1.outcome === 'DOCS_REQUIRED'

  return (
    <div>
      <h2 style={{ margin: 0 }}>Documents requested</h2>
      <p className="muted">
        {required
          ? 'We need payslips + proof of address before a second check.'
          : 'Docs are optional for this path, but this page demonstrates a guarded route.'}
      </p>

      <div className="card" style={{ marginTop: 12 }}>
        <div style={{ fontWeight: 700 }}>Required documents (demo)</div>
        <ul className="muted">
          <li>Payslip (last 3 months)</li>
          <li>Proof of address (utility bill)</li>
        </ul>
      </div>

      {pending ? <Spinner label="Uploading documents…" /> : null}

      {state.docs.uploaded ? (
        <div className="card" style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700 }}>Uploaded</div>
          <ul className="muted">
            {state.docs.files.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </div>
      ) : null}

      {state.error ? (
        <div style={{ marginTop: 12, padding: 10, border: '1px solid #fecaca', borderRadius: 10, background: '#fef2f2' }}>
          <div style={{ fontWeight: 700, color: '#991b1b' }}>Error</div>
          <div className="muted">{state.error}</div>
        </div>
      ) : null}

      <div className="row" style={{ marginTop: 16 }}>
        <button className="primary" onClick={upload} disabled={pending || state.docs.uploaded}>
          Upload documents
        </button>
        <button onClick={() => nav('/check-1')}>Back</button>
      </div>
    </div>
  )
}