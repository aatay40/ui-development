// TODO(Day5): LocalStorage persistence key
export const STORAGE_KEY = 'taskmaster:kanban:v2'

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

  // dynamic column metadata (titles, etc.)
  columnMeta: {
    todo: { id: 'todo', title: 'To Do' },
    'in-progress': { id: 'in-progress', title: 'In Progress' },
    done: { id: 'done', title: 'Done' }
  },

  // dynamic column ordering (render order)
  columnOrder: ['todo', 'in-progress', 'done'],

  error: null
}

// TODO(Day5): Refactor loadInitialState with the new state structure, but allow records with old structure survive (backward compatiblity)
// Backwards-compatible loader: if older saved state exists, we "upgrade" it
export function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultInitialState

    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return defaultInitialState

    const tasksById = parsed.tasksById && typeof parsed.tasksById === 'object' ? parsed.tasksById : null
    const columns = parsed.columns && typeof parsed.columns === 'object' ? parsed.columns : null

    if (!tasksById || !columns) return defaultInitialState

    // v3 fields (optional if user had older snapshot)
    const columnMeta =
      parsed.columnMeta && typeof parsed.columnMeta === 'object' ? parsed.columnMeta : null
    const columnOrder = Array.isArray(parsed.columnOrder) ? parsed.columnOrder : null

    // If columnMeta missing, derive from columns keys
    const derivedMeta =
      columnMeta ||
      Object.fromEntries(
        Object.keys(columns).map((id) => [id, { id, title: prettifyColumnId(id) }])
      )

    // If columnOrder missing, derive from keys (stable-ish)
    const derivedOrder = columnOrder || Object.keys(derivedMeta)

    // Ensure every column in order exists in columns + meta
    const safeOrder = derivedOrder.filter((id) => derivedMeta[id])
    const safeColumns = { ...columns }
    for (const id of safeOrder) {
      if (!Array.isArray(safeColumns[id])) safeColumns[id] = []
    }

    // Ensure tasks refer to existing columns; if not, push into first column
    const fallbackCol = safeOrder[0] || 'todo'
    const fixedTasksById = { ...tasksById }
    for (const [tid, t] of Object.entries(fixedTasksById)) {
      if (!t || typeof t !== 'object') continue
      if (!t.columnId || !safeColumns[t.columnId]) {
        fixedTasksById[tid] = { ...t, columnId: fallbackCol }
        safeColumns[fallbackCol] = [tid, ...(safeColumns[fallbackCol] || [])]
      }
    }

    return {
      ...defaultInitialState,
      tasksById: fixedTasksById,
      columns: safeColumns,
      columnMeta: derivedMeta,
      columnOrder: safeOrder,
      error: null
    }
  } catch {
    return defaultInitialState
  }
}

// Make the columnId humanly readable
function prettifyColumnId(id) {
  return String(id)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function kanbanReducer(state, action) {
  switch (action.type) {
    case 'ADD_TASK': {
      const t = action.payload.task

      // if column doesn't exist, fall back to first known column
      const fallbackCol = state.columnOrder[0] || 'todo'
      const columnId = state.columns[t.columnId] ? t.columnId : fallbackCol

      const task = { ...t, columnId }

      return {
        ...state,
        tasksById: { ...state.tasksById, [task.id]: task },
        columns: { 
          ...state.columns, 
          [columnId]: [task.id, ...(state.columns[columnId] || [])] 
        }                         
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
                          (state.columns[t.columnId] || [])
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

      if (!state.columns[toColumn]) 
        return state

      // - remove id from old column list
      const fromIds = 
        (state.columns[fromColumn] || [])
          .filter((x) => x !== id)

      // base destination list:
      // - if moving within same column, use fromIds as base
      // - if moving to different column, use destination column as base
      const baseTo = fromColumn === toColumn 
        ? fromIds 
        : [...(state.columns[toColumn] || [])]


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

    // --- Dynamic columns ---
    case 'ADD_COLUMN': {
      const { id, title } = action.payload
      if (!id || state.columnMeta[id]) return state

      return {
        ...state,
        columns: { ...state.columns, [id]: [] },
        columnMeta: { ...state.columnMeta, [id]: { id, title: title || prettifyColumnId(id) } },
        columnOrder: [...state.columnOrder, id]
      }
    }

    case 'RENAME_COLUMN': {
      const { id, title } = action.payload
      if (!state.columnMeta[id]) return state
      return {
        ...state,
        columnMeta: {
          ...state.columnMeta,
          [id]: { ...state.columnMeta[id], title: title || state.columnMeta[id].title }
        }
      }
    }

    case 'DELETE_COLUMN': {
      const { id } = action.payload
      if (!state.columnMeta[id]) return state

      const remainingOrder = state.columnOrder.filter((x) => x !== id)
      const fallbackCol = remainingOrder[0]

      // If it's the last column, block delete (keeps app stable)
      if (!fallbackCol) return state

      // Move tasks from deleted column to fallback
      const movingIds = state.columns[id] || []
      const nextColumns = { ...state.columns }
      delete nextColumns[id]
      nextColumns[fallbackCol] = [...movingIds, ...(nextColumns[fallbackCol] || [])]

      const nextTasksById = { ...state.tasksById }
      for (const tid of movingIds) {
        const t = nextTasksById[tid]
        if (t) nextTasksById[tid] = { ...t, columnId: fallbackCol, updatedAt: Date.now() }
      }

      const nextMeta = { ...state.columnMeta }
      delete nextMeta[id]

      return {
        ...state,
        tasksById: nextTasksById,
        columns: nextColumns,
        columnMeta: nextMeta,
        columnOrder: remainingOrder
      }
    }

    case 'MOVE_COLUMN': {
      const { fromIndex, toIndex } = action.payload

      const order = [...state.columnOrder]
      
      if (fromIndex < 0 || fromIndex >= order.length) 
        return state
      
      if (toIndex < 0 || toIndex >= order.length) 
        return state
      
      if (fromIndex === toIndex) 
        return state

      const [moved] = order.splice(fromIndex, 1)
      order.splice(toIndex, 0, moved)

      return { ...state, columnOrder: order }
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