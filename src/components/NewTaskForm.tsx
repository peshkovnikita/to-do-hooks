import { useState } from 'react'

export default function NewTaskForm ({ onItemAdded }) {
    const [text, setText] = useState('')
    const [taskMin, setMin] = useState('')
    const [taskSec, setSec] = useState('')

    const onTextChange = (e) => {
        setText(e.target.value)
    }

    const onMinChange = (e) => {
        const value = e.target.value;
        if(Number(value) <= 999 && /^\d{0,3}$/.test(value)) {
            setMin(value)
        }
    }

    const onSecChange = (e) => {
        const value = e.target.value
        if(Number(value) <= 59 && /^\d{0,2}$/.test(value)) {
            setSec(value)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const totalSeconds = Number(taskMin) * 60 + Number(taskSec)
        onItemAdded(text, totalSeconds)
        setText('')
        setMin('')
        setSec('')
    }

    return (
        <header className='header'>
            <h1>todos hooks</h1>
            <form action='' onSubmit={onSubmit} className='new-todo-form'>
                <input type='text'
                       autoFocus
                       className='new-todo'
                       placeholder='What needs to be done?'
                       value={text}
                       onChange={onTextChange}
                />
                <input type="text" value={taskMin} onChange={onMinChange} className="new-todo-form__timer" placeholder="Min" />
                <input type="text" value={taskSec} onChange={onSecChange} className="new-todo-form__timer" placeholder="Sec" />
                <button type='submit' className='visually-hidden'/>
            </form>
        </header>
    )
}



// const onSubmitTask = (e) => {
//     e.preventDefault()
//     const { taskText, taskMin, taskSec } = this.state;
//     const totalSeconds = Number(taskMin) * 60 + Number(taskSec)
//     this.props.onItemAdded(taskText, totalSeconds)
//
//     this.setState({
//         taskText: '',
//     })
// }
