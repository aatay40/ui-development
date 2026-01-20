import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { CreditProvider } from './state/CreditStore.jsx'
import Stepper from './components/Stepper.jsx'
import FlowGate from './components/FlowGate.jsx'

import Home from './routes/Home.jsx'
import Check1 from './routes/Check1.jsx'
import DocsUpload from './routes/DocsUpload.jsx'
import Check2 from './routes/Check2.jsx'
import Decision from './routes/Decision.jsx'
import NotFound from './routes/NotFound.jsx'

export default function App() {
  return (
    <CreditProvider>
      <div className="container">
        <div className="card">
          <div className="row" style={{ justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18 }}>Credit Check Flow (Demo)</div>
              <div className="muted">Routing + guards + async fetching patterns (mock API)</div>
            </div>
            <div className="row">
              <Link className="muted" to="/">Home</Link>
              <Link className="muted" to="/check-1">Check 1</Link>
              <Link className="muted" to="/docs">Docs</Link>
              <Link className="muted" to="/check-2">Check 2</Link>
              <Link className="muted" to="/decision">Decision</Link>
            </div>
          </div>

          <hr />

          <Stepper />

          <hr />

          <FlowGate>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/check-1" element={<Check1 />} />
                <Route path="/docs" element={<DocsUpload />} />
                <Route path="/check-2" element={<Check2 />} />
                <Route path="/decision" element={<Decision />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
          </FlowGate>
        </div>
      </div>
    </CreditProvider>
  )
}