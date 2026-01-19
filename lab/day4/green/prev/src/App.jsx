import React from 'react'
import { Layout } from './components/Layout.jsx'
import { Board } from './features/Board.jsx'
import { TaskComposer } from './features/TaskComposer.jsx'
import { KanbanProvider, useKanban } from './state/KanbanContext.jsx'

// TODO(Day2): show error banner from state.error

function Shell() {
  const { state } = useKanban()

  return (
    <Layout>
      <div className="mb-4">
        <TaskComposer />
      </div>

      {/* TODO(Day2): show state.error here */}
      {state.error ? (
        <div className="mb-3 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-700">{state.error}</div>
      ) : null}

      <Board />
    </Layout>
  )
}

export default function App() {
  return (
    <KanbanProvider>
      <Shell />
    </KanbanProvider>
  )
}