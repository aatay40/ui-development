import { DragDropContext } from '@hello-pangea/dnd'
import { Column } from './Column.jsx'
import { useKanban } from '../state/KanbanContext.jsx'

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
  const { state, dispatch } = useKanban()

  const onDragEnd = (result) => {
    // TODO(Day3): ignore drop outside and same-position drops
    // if (!result.destination) return
    // if destination droppableId/index equals source droppableId/index return

    // TODO(Day3): dispatch MOVE_TASK with:
    // id: result.draggableId
    // toColumn: result.destination.droppableId
    // toIndex: result.destination.index
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
    </DragDropContext>
  )
}