/*
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Column {
  id: TaskStatus;
  title: string;
  taskIds: string; // why ???
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string;
  createdAt: string;
}

// Dictionary over Arrays
export interface BoardData {
  // A dictionary of tasks indexed by their ID.
  // This allows instant access without iterating through arrays.
  tasks: Record<string, Task>; 
  
  // A dictionary of columns indexed by their ID.
  columns: Record<string, Column>;
  
  // The specific order of columns on the board.
  columnOrder: TaskStatus;
}

Add EsLint and no-redeclare
Discussion Interface or Type ?
https://www.totaltypescript.com/type-vs-interface-which-should-you-use

*/

export type ColumnId = 'todo' | 'in-progress' | 'done'

/*
export type Column = { 
    id: ColumnId; 
    title: string 
}
*/

export type Task = {
  id: string
  title: string
  description?: string
  columnId: ColumnId
  updatedAt: number
}

export type KanbanState = {
  tasksById: Record<string, Task>
  columns: Record<string, string[]>
  error: string | null
}

// TODO: Use a discriminated union for actions (below).