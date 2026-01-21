import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function HelpPage() {
  const { topic } = useParams()
  const navigate = useNavigate()

  return (
    <div>
      <h2 style={{ margin: 0 }}>Help</h2>
      <p className="muted">
        This page demonstrates <code>useParams</code> and dynamic routing.
      </p>

      <div
        style={{
          marginTop: 12,
          padding: 12,
          border: '1px solid #cbd5e1',
          borderRadius: 12,
          background: '#f8fafc'
        }}
      >
        <div style={{ fontWeight: 700 }}>Requested topic</div>
        <div className="muted">
          <code>{topic}</code>
        </div>
      </div>

      <hr />

      <div className="row">
        <button onClick={() => navigate('/help/routing')}>
          Routing
        </button>
        <button onClick={() => navigate('/help/guards')}>
          Guards
        </button>
        <button onClick={() => navigate('/help/use-effect')}>
          useEffect
        </button>
      </div>

      <hr />

      <div className="card">
        {renderHelpContent(topic)}
      </div>

      <div className="row" style={{ marginTop: 16 }}>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
    </div>
  )
}

function renderHelpContent(topic) {
  switch (topic) {
    case 'routing':
      return (
        <>
          <h3>Routing</h3>
          <p className="muted">
            Routing decides which component is rendered based on the URL.
            In a Single Page Application, this happens without reloading the page.
          </p>
        </>
      )

    case 'guards':
      return (
        <>
          <h3>Guards</h3>
          <p className="muted">
            Guards prevent users from navigating to pages they are not allowed to see.
            In this app, guards enforce the credit-check flow.
          </p>
        </>
      )

    case 'use-effect':
      return (
        <>
          <h3>useEffect</h3>
          <p className="muted">
            useEffect runs side effects after React renders.
            It is commonly used for data fetching, persistence, and subscriptions.
          </p>
        </>
      )

    default:
      return (
        <>
          <h3>Unknown topic</h3>
          <p className="muted">
            No help is available for this topic.
          </p>
        </>
      )
  }
}