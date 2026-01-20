import React from 'react'
import { kanbanReducer, initialState } from './kanbanReducer'

// create context + provider + hook
// - KanbanProvider uses useReducer
// - value should be { state, dispatch }
// - useKanban throws if used outside provider

const KanbanContext = React.createContext(null)

export function KanbanProvider({ children }) {
  // useReducer inside the Provider creates the actual state at runtime.
  const [state, dispatch] = React.useReducer(kanbanReducer, initialState)
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