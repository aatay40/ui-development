import React from 'react'
import { kanbanReducer, initialState } from './kanbanReducer'

// TODO(Day2): create context + provider + hook
// - KanbanProvider uses useReducer
// - value should be { state, dispatch }
// - useKanban throws if used outside provider

export function KanbanProvider({ children }) {
  // TODO(Day2): wire useReducer
  return <>{children}</>
}

export function useKanban() {
  // TODO(Day2): wire useContext
  throw new Error('TODO(Day2): implement useKanban()')
}