/** @typedef {import('./domain/types').Column} Column */
/** @typedef {import('./domain/types').Task} Task */

/** @type {Column[]} */
export const columns = [ // Alternative to typed version
// export const columns = [
  { 
    id: 'todo', 
    title: 'To Do' 
  },
  { 
    id: 'in-progress', 
    title: 'In Progress' 
  },
  { 
    id: 'done', 
    title: 'Done' 
  }
]

/** @type {Task[]} */
export const tasks = [ // Alternative to typed version
// export const tasks = [
  { 
    id: 't-1', 
    title: 'Welcome', 
    description: 'Edit or move me later', 
    columnId: 'todo' 
  },
  { 
    id: 't-2', 
    title: 'Learn React', 
    description: 'Props, state, effects', 
    columnId: 'in-progress' 
  },
  { 
    id: 't-3', 
    title: 'Ship', 
    description: 'Deploy on Day 5', 
    columnId: 'done' 
  }
]