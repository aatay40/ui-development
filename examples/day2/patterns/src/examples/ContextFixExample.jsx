import React from 'react'

const UserContext = React.createContext(null)

export default function ContextFixExample() {
  const [user] = React.useState({ name: 'Alice', role: 'Analyst' })

  return (
    <div>
      <div style={{ fontWeight: 800, fontSize: 16 }}>Context fixes prop drilling</div>
      <p className="muted">
        Context doesn’t manage state — it distributes values without passing props through every layer.
      </p>

      <div className="row">
        <div className="card" style={{ flex: 1 }}>
          <UserContext.Provider value={user}>
            <AppShell />
          </UserContext.Provider>
        </div>

        <div className="card" style={{ width: 320 }}>
          <div style={{ fontWeight: 700 }}>Teaching prompts</div>
          <ul className="muted">
            <li>“Which components changed?” (Mostly removing props)</li>
            <li>“Where is the value provided?” (Provider)</li>
            <li>“Where is it consumed?” (Leaf)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function AppShell() {
  return (
    <div>
      <div className="muted">AppShell (no longer passes user)</div>
      <Page />
    </div>
  )
}

function Page() {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="muted">Page (no longer passes user)</div>
      <Toolbar />
    </div>
  )
}

function Toolbar() {
  return (
    <div style={{ marginTop: 10 }}>
      <div className="muted">Toolbar (no longer passes user)</div>
      <UserMenu />
    </div>
  )
}

function UserMenu() {
  const user = React.useContext(UserContext)

  if (!user) {
    return <div className="muted">No user found in context.</div>
  }

  return (
    <div style={{ marginTop: 10, padding: 10, border: '1px dashed #cbd5e1', borderRadius: 10 }}>
      <div style={{ fontWeight: 700 }}>UserMenu (reads from context)</div>
      <div className="muted">Hello {user.name} — role: {user.role}</div>
    </div>
  )
}