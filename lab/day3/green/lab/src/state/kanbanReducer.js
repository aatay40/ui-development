export const initialState = {
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
      // - remove id from old column list
      // - insert into new column list at toIndex
      // - update task.columnId and updatedAt
      return state
    }

    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.payload.message }

    case 'CLEAR_ERROR':
      return { 
        ...state, 
        error: null }

    default:
      return state
  }
}