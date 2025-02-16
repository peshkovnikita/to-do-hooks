import Task from './Task'

type TaskType = {
    id: number
    description: string
    seconds: number
    isEditing: boolean
    isDone: boolean
    creationTime: number
}

type TaskListProps = {
    data: TaskType[]
    onDelete: (id: number) => void
    onDone: (id: number) => void
    makeEditable: (id: number) => void
    onUpdate: (id: number, text: string) => void
}

function TaskList({ data, onDelete, onDone, makeEditable, onUpdate }: TaskListProps) {

    const tasks = data.map(taskData => <Task
        { ...taskData }
        key={ taskData.id }
        onDelete={ () => onDelete(taskData.id) }
        onDone={ () => onDone(taskData.id) }
        makeEditable={ () => makeEditable(taskData.id) }
        onUpdate={ onUpdate }
    />)

    return (
        <ul className='todo-list'>
            {tasks}
        </ul>
    )
}

export default TaskList