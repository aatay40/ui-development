import React from 'react'
import CounterUseState from './examples/CounterUseState.jsx'
import CounterUseReducer from './examples/CounterUseReducer.jsx'
import PropDrillingExample from './examples/PropDrillingExample.jsx'
import ContextFixExample from './examples/ContextFixExample.jsx'

const options = [
  { id: 'useState', label: 'useState Counter', element: <CounterUseState /> },
  { id: 'useReducer', label: 'useReducer Counter (state machine)', element: <CounterUseReducer /> },
  { id: 'propdrill', label: 'Prop drilling problem', element: <PropDrillingExample /> },
  { id: 'context', label: 'Context fixes prop drilling', element: <ContextFixExample /> }
]

export default function App() {
  const [selected, setSelected] = React.useState(options[0].id)
  const active = options.find((o) => o.id === selected)

  return (
    <div className="container">
      <div className="card">
        <div className="row" style={{ justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>React Patterns Demo (React 18)</div>
            <div className="muted">Pick an example to demo in class.</div>
          </div>

          <div className="row">
            <label className="muted" htmlFor="example">Example</label>
            <select
              id="example"
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
            >
              {options.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        <hr />

        {active?.element}
      </div>
    </div>
  )
}