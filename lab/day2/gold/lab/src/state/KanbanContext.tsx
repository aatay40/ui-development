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
  return <>{children}</>
}

export function useKanban(): KanbanCtx {
  // TODO(Day2,GOLD): implement hook with runtime guard
  throw new Error('TODO(Day2,GOLD): implement useKanban()')
}