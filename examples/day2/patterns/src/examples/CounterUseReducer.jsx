import React from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'INC':
      return { count: state.count + 1 }
    case 'DEC':
      return { count: state.count - 1 }
    case 'RESET':
      return { count: 0 }
    case 'DOUBLE':
      return { count: state.count * 2 }
    default:
      return state
  }
}

export default function CounterUseReducer() {
  const [state, dispatch] = React.useReducer(reducer, { count: 0 })

  return (
    <div>
      <div style={{ fontWeight: 800, fontSize: 16 }}>useReducer Counter (state machine)</div>
      <p className="muted">
        UI sends messages. Reducer decides the rules and returns the next state.
      </p>

      <div className="row">
        <div style={{ fontSize: 28, fontWeight: 800 }}>Count: {state.count}</div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <button onClick={() => dispatch({ type: 'INC' })}>+</button>
        <button onClick={() => dispatch({ type: 'DEC' })}>-</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        <button onClick={() => dispatch({ type: 'DOUBLE' })}>Double</button>
      </div>

      <p className="muted" style={{ marginTop: 12 }}>
        2-minute exercise: Add action <b>HALF</b> (floor division) and a button without touching existing cases.
      </p>
    </div>
  )
}