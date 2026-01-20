import React from 'react'

export default function CounterUseState() {
  const [count, setCount] = React.useState(0)

  return (
    <div>
      <div style={{ fontWeight: 800, fontSize: 16 }}>useState Counter</div>
      <p className="muted">
        Here the UI directly decides how to change state. Simple and fine for local state.
      </p>

      <div className="row">
        <div style={{ fontSize: 28, fontWeight: 800 }}>Count: {count}</div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <button onClick={() => setCount(count + 1)}>+</button>
        <button onClick={() => setCount(count - 1)}>-</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>

      <p className="muted" style={{ marginTop: 12 }}>
        Discussion prompt: “If we add more rules, where do they go?” (Answer: each onClick.)
      </p>
    </div>
  )
}