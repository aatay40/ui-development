import { columns, tasks } from './sampleData'
import { Column } from './Column'

export function Board() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {
        columns.map((c) => (
          <Column key={c.id} 
                column={c} 
                tasks={
                    tasks.filter((t) => t.columnId === c.id)
                } />
        ))
      }
    </div>
  )
}