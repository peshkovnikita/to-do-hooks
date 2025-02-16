import { useState } from 'react'
import NewTaskForm from './components/NewTaskForm.tsx'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

export type TaskType = {
    id: number
    description: string
    seconds: number
    isEditing: boolean
    isDone: boolean
    creationTime: number
}

type FilterState = 'all' | 'active' | 'completed'

function App() {

    const [allTasks, setTask] = useState<TaskType[]>([])
    const [filterState, setFilter] = useState<FilterState>('all')

    const createTask = (description: string, seconds: number): TaskType => {
        return {
            description,
            seconds,
            isEditing: false,
            isDone: false,
            creationTime: Date.now(),
            id: Date.now() + Number(Math.random().toFixed(4)),
        }
    }

    const addItem = (text: string, seconds: number) => {
        if(text.trim()) {
            const newTask = createTask(text, seconds)
            setTask([...allTasks, newTask])
        }
    }

    const findTaskById = (id: number): number => allTasks.findIndex((item) => item.id === id)

    const deleteItem = (id: number) => {
        const index = findTaskById(id)
        const newTaskData = allTasks.toSpliced(index, 1)
        setTask(newTaskData)
    }

    const onToggleDone = (id: number) => {
        const index = findTaskById(id)
        const oldTask = allTasks[index]
        const doneTask = {...oldTask, isDone: !oldTask.isDone}
        setTask(allTasks.toSpliced(index, 1, doneTask))
    }

    const makeEditable = (id: number) => {
        setTask(allTasks.map(task =>
            task.id === id ? { ...task, isEditing: true } : task
        ))
    }

    const onUpdate = (id: number, text: string) => {
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
        const uncompletedTasks = allTasks.filter(item => !item.isDone)
        setTask(uncompletedTasks)
    }

    const onToggleFilter = (filterState: FilterState) => setFilter(filterState)

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
                    makeEditable={ makeEditable }
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
