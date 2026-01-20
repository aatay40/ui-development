import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <h2 style={{ margin: 0 }}>Not Found</h2>
      <p className="muted">That page does not exist.</p>
      <Link to="/">Go home</Link>
    </div>
  )
}