// TODO(Day5): LocalStorage persistence key
export const STORAGE_KEY = 'taskmaster:kanban:v1'

// we use the information stored in local storage if available, so renaming this to defaultInitialState
export const defaultInitialState = {
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

// TODO(Day5): Load state from localStorage or use defaultInitialState if not found
export function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) 
      return defaultInitialState

    const parsed = JSON.parse(raw)

    // Minimal shape validation
    if (!parsed || typeof parsed !== 'object') 
      return defaultInitialState
    
    if (!parsed.tasksById || !parsed.columns) 
      return defaultInitialState

    return {
      ...defaultInitialState,
      ...parsed,
      error: null // do not persist transient errors
    }
  } catch {
    return defaultInitialState
  }
}

export function kanbanReducer(state, action) {
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

      if (!t) {
        return state
      }

      const tasksById = 
        Object.fromEntries(
            Object.entries(
                state.tasksById)
                  .filter(
                    ([k]) => k !== id))

      const columns = { ...state.columns, 
                        [t.columnId]: 
                          state.columns[t.columnId]
                            .filter(
                                (x) => x !== id) }

      return { 
        ...state, 
        tasksById, 
        columns }
    }

    case 'MOVE_TASK': {
      // TODO(Day3): implement move across columns + reorder
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
      // - update task.columnId and updatedAt
      const toIds = [...baseTo]
      toIds.splice(toIndex, 0, id)

      return {
        ...state,
        tasksById: {
          ...state.tasksById,
          [id]: { ...t, columnId: toColumn, updatedAt: Date.now() }
        },
        columns: {
          ...state.columns,
          [fromColumn]: fromIds,
          [toColumn]: toIds
        }
      }
    }

    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.payload.message }

    case 'CLEAR_ERROR':
      return { 
        ...state, 
        error: null }

    // TODO(Day5): Add RESET_BOARD action
    case 'RESET_BOARD': {
      return defaultInitialState
    }    

    default:
      return state
  }
}