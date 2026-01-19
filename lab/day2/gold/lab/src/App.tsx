import React from 'react'
import { Layout } from './components/Layout'
import { Board } from './features/Board'
import { TaskComposer } from './features/TaskComposer'
import { KanbanProvider, useKanban } from './state/KanbanContext'

function Shell() {
  // TODO(Day2,GOLD): read state from hook, show error banner
  return (
    <Layout>
      <div className="mb-4">
        <TaskComposer />
      </div>
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