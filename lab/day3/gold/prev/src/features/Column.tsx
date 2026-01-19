import { TaskCard } from './TaskCard'
import type { Task, Column as ColumnType } from '../domain/types'

type Props = {  
  column: ColumnType
  tasks: Task[]
}

/*
  Here we have 2 parameters for the function, and there are multiple ways to solve the problem:
  1- import type { Task, Column as ColumnType } from '../domain/types'
     
     type Props = {
       column: ColumnType
       tasks: Tasks[]
     }

     export function Column({ column, tasks } : Props) { 

  2- import { Task, Column } from '../domain/types'
  
     export type ColumnProps = {
       column: Column
       tasks: Task[]
     }

     export function Column(props : ColumnProps)

  3- export function Column({ column, tasks }: { column: Column; tasks: Task[] })
*/

export function Column({ column, tasks } : Props) {
  return (
    <div className="rounded-xl border bg-white p-3">
      <div className="font-bold mb-2">{column.title}</div>
      {
        tasks.map((t) => (
            <TaskCard key={t.id} 
                      task={t} />
        ))
      }
    </div>
  )
}