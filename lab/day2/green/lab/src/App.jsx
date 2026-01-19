import React from 'react'
import { Layout } from './components/Layout.jsx'
import { Board } from './features/Board.jsx'
import { TaskComposer } from './features/TaskComposer.jsx'
import { KanbanProvider, useKanban } from './state/KanbanContext.jsx'

// TODO(Day2): show error banner from state.error

function Shell() {
  // TODO(Day2): read state from useKanban()
  return (
    <Layout>
      <div className="mb-4">
        <TaskComposer />
      </div>

      {/* TODO(Day2): show state.error here */}

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