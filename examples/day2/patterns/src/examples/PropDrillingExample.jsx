import React from 'react'

export default function PropDrillingExample() {
  const [user] = React.useState({ name: 'Alice', role: 'Analyst' })

  return (
    <div>
      <div style={{ fontWeight: 800, fontSize: 16 }}>Prop drilling problem</div>
      <p className="muted">
        The data is only needed by the leaf component, but it’s passed through multiple layers.
      </p>

      <div className="row">
        <div className="card" style={{ flex: 1 }}>
          <AppShell user={user} />
        </div>

        <div className="card" style={{ width: 320 }}>
          <div style={{ fontWeight: 700 }}>Teaching prompts</div>
          <ul className="muted">
            <li>“Which component actually uses <b>user</b>?”</li>
            <li>“Which components are just plumbing?”</li>
            <li>“What happens if we add 3 more layers?”</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function AppShell({ user }) {
  return (
    <div>
      <div className="muted">AppShell (passes user down)</div>
      <Page user={user} />
    </div>
  )
}

function Page({ user }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="muted">Page (passes user down)</div>
      <Toolbar user={user} />
    </div>
  )
}

function Toolbar({ user }) {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="muted">Toolbar (passes user down)</div>
      <UserMenu user={user} />
    </div>
  )
}

function UserMenu({ user }) {
  return (
    <div style={{ marginTop: 10, padding: 10, border: '1px dashed #cbd5e1', borderRadius: 10 }}>
      <div style={{ fontWeight: 700 }}>UserMenu (actually uses user)</div>
      <div className="muted">Hello {user.name} — role: {user.role}</div>
    </div>
  )
}