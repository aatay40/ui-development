// TODO(Day2): This day introduces useReducer + normalised-ish state.
// Keep it simple: tasksById + columns arrays + error.

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
  // shape of the state is available in initialState, we are storing an object

  switch (action.type) {
    case 'ADD_TASK': {
      // TODO(Day2): implement add task
      // - action.payload.task includes id/title/description/columnId/updatedAt
      // - prepend to the column array
      return state
    }

    case 'DELETE_TASK': {
      // TODO(Day2): implement delete task
      // - remove from tasksById
      // - remove id from its column list
      return state
    }

    case 'SET_ERROR':
      // TODO(Day2): set error message
      return state

    case 'CLEAR_ERROR':
      // TODO(Day2): clear error
      return state

    default:
      return state
  }
}