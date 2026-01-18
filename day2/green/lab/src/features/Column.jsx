import { TaskCard } from './TaskCard.jsx'

export function Column({ column, tasks }) {
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