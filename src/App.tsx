import { useState } from 'react'
import NewTaskForm from './components/NewTaskForm.tsx'
import TaskList from './components/TaskList'
import Footer from './components/Footer'

function App() {

    const [allTasks, setTask] = useState([])

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

    const findTaskById = (id) => {
        return allTasks.findIndex((item) => item.id === id)
    }

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

    return (
        <section className='todoapp'>
            <NewTaskForm onItemAdded={addItem} />
            <section className='main'>
                <TaskList data={ allTasks }
                          onDelete={ deleteItem }
                          onDone={ onToggleDone }
                />
                <Footer/>
            </section>
        </section>
    )
}

export default App
