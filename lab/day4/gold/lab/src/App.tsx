import React from 'react'
import { Layout } from './components/Layout'
import { Board } from './features/Board'
import { TaskComposer } from './features/TaskComposer'
import { KanbanProvider, useKanban } from './state/KanbanContext'

function Shell() {
  // TODO(Day2,GOLD): read state from hook, show error banner
  const { state } = useKanban()

  return (
    <Layout>
      <div className="mb-4">
        <TaskComposer />
      </div>

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