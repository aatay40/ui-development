import React from 'react'
import { Navigate } from 'react-router-dom'
import { useCredit } from '../state/CreditStore.jsx'

// Guard helpers so you can DEMO the concept without heavy auth.
export function RequireCheck1Done({ children }) {
  const { state } = useCredit()
  const ok = state.check1.status === 'DONE'
  if (!ok) return <Navigate to="/" replace />
  return children
}

export function RequireDocsIfNeeded({ children }) {
  const { state } = useCredit()
  // If Check1 said docs required, enforce docs upload before check2
  const needsDocs = state.check1.outcome === 'DOCS_REQUIRED'
  if (needsDocs && !state.docs.uploaded) return <Navigate to="/docs" replace />
  return children
}