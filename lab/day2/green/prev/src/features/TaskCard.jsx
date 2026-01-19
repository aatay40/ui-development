export function TaskCard({ task }) {
  return (
    <div className="rounded-lg border bg-white p-3 shadow-sm mb-2">
      <div className="font-semibold">{task.title}</div>
      {
        task.description 
            ? <div className="text-xs text-slate-600 mt-1">{task.description}</div> 
            : null}
    </div>
  )
}