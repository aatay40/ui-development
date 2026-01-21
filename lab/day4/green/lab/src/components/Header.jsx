export function Header() {
  return (
    <div className="flex items-center justify-between border-b bg-white p-3">
      <div>
        <div className="text-lg font-bold">TaskMaster</div>
        <div className="text-xs text-slate-500">Day 4: Material UI</div>
      </div>

      <div className="flex gap-2">
        <button className="px-3 py-2 rounded-lg bg-slate-900 text-white text-sm">
          New Task
        </button>
        <button className="px-3 py-2 rounded-lg border text-sm">
          Refresh
        </button>
      </div>
    </div>
  )
}
