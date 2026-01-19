import { Column } from './Column.jsx'
import { useKanban } from '../state/KanbanContext.jsx'

// TODO(Day2): board should render from reducer state (not sampleData)
// columns are fixed: todo, in-progress, done

const columns = [
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

export function Board() {
  const { state } = useKanban()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {
        // notice that it is not () but {} and it uses return
        columns.map((c) => {
          // TODO (Day2): pass tasks by reading state.columns[c.id] and mapping ids to tasksById
          const ids = state.columns[c.id] || []
          const tasks = ids
                          .map(
                            (id) => state.tasksById[id])
                          .filter(Boolean)
          
          return <Column key={c.id}
                         column={c}
                         tasks={tasks} />
        })
      }
    </div>
  )
}