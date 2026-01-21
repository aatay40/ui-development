import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useCredit } from '../state/CreditStore.jsx'

// Computes where the user is allowed to be.
// Rule: you can only visit steps you've reached, plus the next step.
function allowedPath(state) {
  // Not started
  if (!state.applicant.name.trim()) return '/'

  // Check1 not done yet: you can be on Home or Check1
  if (state.check1.status !== 'DONE') return '/check-1'

  // Check1 done
  if (state.check1.outcome === 'DENIED' || state.check1.outcome === 'APPROVED') {
    return '/decision'
  }

  // Docs required
  if (!state.docs.uploaded) return '/docs'

  // Docs uploaded but Check2 not done
  if (state.check2.status !== 'DONE') return '/check-2'

  // Final decision
  return '/decision'
}

export default function FlowGate({ children }) {
  const { state } = useCredit()
  const loc = useLocation()

  if (loc.pathname.startsWith('/help/')) {
    return children
  }

  const mustBeAt = allowedPath(state)
  const allowed = loc.pathname === '/' || loc.pathname === mustBeAt

  // You can allow back-navigation too by making a set of allowed paths.
  // Simple rule: permit the "mustBeAt" AND any earlier steps.
  const allowedSet = new Set(['/'])
  if (state.applicant.name.trim()) allowedSet.add('/check-1')
  if (state.check1.status === 'DONE' && state.check1.outcome === 'DOCS_REQUIRED') allowedSet.add('/docs')
  if (state.docs.uploaded) allowedSet.add('/check-2')
  if (state.check1.status === 'DONE') allowedSet.add('/decision')

  if (!allowedSet.has(loc.pathname)) {
    return <Navigate to={mustBeAt} replace />
  }

  return children
}