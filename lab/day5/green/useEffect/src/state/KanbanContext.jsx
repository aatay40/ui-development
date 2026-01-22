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
  React.useEffect(() => {
    const snapshot = {
      tasksById: state.tasksById,
      columns: state.columns
      // do NOT persist error
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  }, [state.tasksById, state.columns])

  const value = React.useMemo(() => ({ state, dispatch }), [state, dispatch])

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