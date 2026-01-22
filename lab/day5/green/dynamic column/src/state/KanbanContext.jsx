import React from 'react'
import { kanbanReducer, loadInitialState, STORAGE_KEY } from './kanbanReducer'

// TODO(Day2): create context + provider + hook
// - KanbanProvider uses useReducer
// - value should be { state, dispatch }
// - useKanban throws if used outside provider

const KanbanContext = React.createContext(null)

export function KanbanProvider({ children }) {
  // TODO(Day5): use loadInitialState
  const [state, dispatch] = React.useReducer(kanbanReducer, undefined, loadInitialState)

  // TODO(Day5): persist tasks+columns to localStorage on every change
  // Persist ONLY durable state (no transient error)
  React.useEffect(() => {
    const snapshot = {
      tasksById: state.tasksById,
      columns: state.columns,
      columnMeta: state.columnMeta,
      columnOrder: state.columnOrder
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  }, [state.tasksById, state.columns, state.columnMeta, state.columnOrder])

  const value = React.useMemo(() => ({ state, dispatch }), [state])

  return <KanbanContext.Provider 
            value={{state, dispatch }}>
            {children}
          </KanbanContext.Provider>
}

export function useKanban() {
  const v = React.useContext(KanbanContext)
  if (!v) 
    throw new Error('useKanban must be used within KanbanProvider')

  return v
}