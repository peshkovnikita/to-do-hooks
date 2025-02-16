import Task from './Task'

function TaskList({ data, onDelete, onDone, makeEditable, onUpdate }) {

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