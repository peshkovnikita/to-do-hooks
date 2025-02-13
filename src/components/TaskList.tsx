import Task from './Task'

export default function TaskList({ data, onDelete, onDone }) {
    const tasks = data.map(taskData => <Task
        {...taskData}
        key={taskData.id}
        onDelete={() => onDelete(taskData.id)}
        onDone={() => onDone(taskData.id)}
    />)

    return (
        <ul className='todo-list'>
            {tasks}
        </ul>
    )
}