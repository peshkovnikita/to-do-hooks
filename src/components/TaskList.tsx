import Task from './Task'

function TaskList({ data, onDelete, onDone, onToggleEditing, onUpdate }) {

    const tasks = data.map(taskData => <Task
        { ...taskData }
        key={ taskData.id }
        onDelete={ () => onDelete(taskData.id) }
        onDone={ () => onDone(taskData.id) }
        onToggleEditing={ () => onToggleEditing(taskData.id) }
        onUpdate={ onUpdate }
    />)

    return (
        <ul className='todo-list'>
            {tasks}
        </ul>
    )
}

export default TaskList