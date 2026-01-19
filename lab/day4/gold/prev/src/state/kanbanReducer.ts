import type { ColumnId, KanbanState, Task } from '../domain/types'

export type Action =
  | { type: 'ADD_TASK'; payload: { task: Task } }
  | { type: 'DELETE_TASK'; payload: { id: string } }
  | { type: 'MOVE_TASK'; payload: { id: string; toColumn: ColumnId; toIndex: number } }
  | { type: 'SET_ERROR'; payload: { message: string } }
  | { type: 'CLEAR_ERROR' }

export const initialState: KanbanState = {
  tasksById: {
    't-1': { 
        id: 't-1', 
        title: 'Welcome', 
        description: 'Edit or move me later', 
        columnId: 'todo', 
        updatedAt: Date.now() },
    't-2': { 
        id: 't-2', 
        title: 'Learn React', 
        description: 'Props, state, effects', 
        columnId: 'in-progress', 
        updatedAt: Date.now() },
    't-3': { 
        id: 't-3', 
        title: 'Ship', 
        description: 'Deploy on Day 5', 
        columnId: 'done', 
        updatedAt: Date.now() }
  },
  columns: {
    todo: ['t-1'],
    'in-progress': ['t-2'],
    done: ['t-3']
  },
  error: null
}

export function kanbanReducer(state: KanbanState, action: Action): KanbanState {
  switch (action.type) {
    case 'ADD_TASK': {
      const t = action.payload.task
      return {
        ...state,
        tasksById: { ...state.tasksById, [t.id]: t },
        columns: { ...state.columns, [t.columnId]: [t.id, ...state.columns[t.columnId]] }
      }
    }

    case 'DELETE_TASK': {
      const id = action.payload.id
      const t = state.tasksById[id]
      if (!t) return state

      const tasksById = Object.fromEntries(Object.entries(state.tasksById).filter(([k]) => k !== id))
      const columns = { ...state.columns, [t.columnId]: state.columns[t.columnId].filter((x) => x !== id) }
      return { ...state, tasksById, columns }
    }

    case 'MOVE_TASK': {
      // TODO(Day3,GOLD): implement move across columns + reorder (typed)
      
      // payload: { id, toColumn, toIndex }    
      const { id, toColumn, toIndex } = action.payload
      const t = state.tasksById[id]

      if (!t) 
        return state

      const fromColumn = t.columnId
      
      // - remove id from old column list
      const fromIds = 
        state.columns[fromColumn]
          .filter((x) => x !== id)
      
      // base destination list:
      // - if moving within same column, use fromIds as base
      // - if moving to different column, use destination column as base
      const baseTo = fromColumn === toColumn 
        ? fromIds 
        : [...state.columns[toColumn]]
      
      // - insert into new column list at toIndex
      const toIds = [...baseTo]
      toIds.splice(toIndex, 0, id)
      
      // - update task.columnId and updatedAt
      return {
        ...state,
        tasksById: { ...state.tasksById, [id]: { ...t, columnId: toColumn, updatedAt: Date.now() } },
        columns: { ...state.columns, [fromColumn]: fromIds, [toColumn]: toIds }
      }      
    }

    case 'SET_ERROR':
      return { ...state, error: action.payload.message }

    case 'CLEAR_ERROR':
      return { ...state, error: null }

    default:
      return state
  }
}