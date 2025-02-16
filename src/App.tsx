import { useState } from 'react'
import NewTaskForm from './components/NewTaskForm.tsx'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

function App() {

    const [allTasks, setTask] = useState([])
    const [filterState, setFilter] = useState('all')

    const createTask = (description, seconds) => {
        return {
            description,
            seconds,
            isEditing: false,
            isDone: false,
            creationTime: Date.now(),
            id: Date.now() + Number(Math.random().toFixed(4)),
        }
    }

    const addItem = (text, seconds) => {
        if(text.trim()) {
            const newTask = createTask(text, seconds)
            setTask([...allTasks, newTask])
        }
    }

    const findTaskById = (id) => allTasks.findIndex((item) => item.id === id)

    const deleteItem = (id) => {
        const index = findTaskById(id)
        const newTaskData = allTasks.toSpliced(index, 1)
        setTask(newTaskData)
    }

    const onToggleDone = (id) => {
        const index = findTaskById(id)
        const oldTask = allTasks[index]
        const doneTask = {...oldTask, isDone: !oldTask.isDone}
        setTask(allTasks.toSpliced(index, 1, doneTask))
    }

    const onToggleEditing = (id) => {
        setTask(allTasks.map(task =>
            task.id === id ? { ...task, isEditing: true } : task
        ))
    }

    const onUpdate = (id, text) => {
        const index = findTaskById(id)
        const taskForUpdate = allTasks[index]
        const edited = {
            ...taskForUpdate,
            isEditing: false,
            description: text,
        }
        setTask(allTasks.toSpliced(index, 1, edited))
    }

    const clearAllCompleted = () => {
        const uncompletedTasks = allTasks.filter(item => item.isDone === false)
        setTask(uncompletedTasks)
    }

    const onToggleFilter = (filterState) => setFilter(filterState)

    const activeTasks = allTasks.filter((el) => !el.isDone)
    const completedTasks = allTasks.filter((el) => el.isDone)
    const tasksLeft = allTasks.length - completedTasks.length

    return (
        <section className='todoapp'>
            <NewTaskForm onItemAdded={addItem} />
            <main className='main'>
                <TaskList
                    data={ filterState === 'all' ? allTasks : filterState === 'active' ? activeTasks : completedTasks }
                    onDelete={ deleteItem }
                    onDone={ onToggleDone }
                    onToggleEditing={ onToggleEditing }
                    onUpdate={ onUpdate }
                />
                <Footer
                    data={ allTasks }
                    tasksLeft={ tasksLeft }
                    onClearAllCompleted={ clearAllCompleted }
                    onToggleFilter={ onToggleFilter }
                    filterState={ filterState }
                />
            </main>
        </section>
    )
}

export default App
