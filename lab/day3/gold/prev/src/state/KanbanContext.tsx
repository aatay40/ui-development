import React from 'react'
import type { KanbanState } from '../domain/types'
import { kanbanReducer, initialState } from './kanbanReducer'
import type { Action } from './kanbanReducer'

// TODO(Day2,GOLD): type the context value
type KanbanCtx = { 
    state: KanbanState; 
    dispatch: React.Dispatch<Action> 
}

const KanbanContext = React.createContext<KanbanCtx | null>(null)

export function KanbanProvider({ children }: { children: React.ReactNode }) {
  // TODO(Day2,GOLD): wire useReducer with types
  const [state, dispatch] = React.useReducer(kanbanReducer, initialState)
  return <KanbanContext.Provider value={{ state, dispatch }}>{children}</KanbanContext.Provider>
}

export function useKanban(): KanbanCtx {
  // TODO(Day2,GOLD): implement hook with runtime guard
  const v = React.useContext(KanbanContext)

  if (!v)
    throw new Error('TODO(Day2,GOLD): implement useKanban()')
  
  return v
}