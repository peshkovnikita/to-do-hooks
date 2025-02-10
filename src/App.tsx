import { useState, useEffect, useCallback, useMemo } from 'react'
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

    const deleteItem = (id) => {
        const index = allTasks.findIndex((item) => item.id === id)
        const newTaskData = allTasks.toSpliced(index, 1)
        setTask(newTaskData)
    }

    return (
        <section className='todoapp'>
            <NewTaskForm onItemAdded={addItem} />
            <section className='main'>
                <TaskList data={ allTasks }
                          onDelete={ deleteItem }
                />
                <Footer/>
            </section>
        </section>
    )
}

export default App
