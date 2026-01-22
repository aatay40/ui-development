import React from 'react'
import { kanbanReducer, loadInitialState, STORAGE_KEY } from './kanbanReducer'

// TODO(Day2): create context + provider + hook
// - KanbanProvider uses useReducer
// - value should be { state, dispatch }
// - useKanban throws if used outside provider

// TODO(Day5,Perf): Context split
// Why: if state + dispatch live in ONE context, every state change re-renders
// components that only need dispatch (buttons, menus, etc.).
// Fix: split into TWO contexts: one for state, one for dispatch.
//
// Rule of thumb:
// - useKanbanState() in “read” components (Board, ErrorBanner, etc.)
// - useKanbanDispatch() in “write-only” components (Delete button, Reset button, etc.)
// - useKanban() only for convenience when you truly need both

// We have two different context now 
const KanbanStateContext = React.createContext(undefined)
const KanbanDispatchContext = React.createContext(undefined)

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

  return (
    <KanbanStateContext.Provider value={state}>
      <KanbanDispatchContext.Provider value={dispatch}>
        {children}
      </KanbanDispatchContext.Provider>
    </KanbanStateContext.Provider>    
  )
}

export function useKanbanState() {
  const state = React.useContext(KanbanStateContext)
  if (state === undefined) 
    throw new Error('useKanbanState must be used within KanbanProvider')

  return state
}

export function useKanbanDispatch() {
  const dispatch = React.useContext(KanbanDispatchContext)
  if (dispatch === undefined) 
    throw new Error('useKanbanDispatch must be used within KanbanProvider')

  return dispatch
}

export function useKanban() {
  return { state: useKanbanState(), dispatch: useKanbanDispatch() }
}