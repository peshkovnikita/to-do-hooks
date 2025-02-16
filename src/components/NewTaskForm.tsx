import { useState } from 'react'
import { ChangeEvent, FormEvent } from 'react'

type Props = {
    onItemAdded: (text: string, seconds: number) => void
}

function NewTaskForm ({ onItemAdded }: Props) {

    const [text, setText] = useState<string>('')
    const [taskMin, setMin] = useState<string>('')
    const [taskSec, setSec] = useState<string>('')

    const onTextChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

    const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (Number(value) <= 999 && /^\d{0,3}$/.test(value)) setMin(value)
    }

    const onSecChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (Number(value) <= 59 && /^\d{0,2}$/.test(value)) setSec(value)
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const totalSeconds = Number(taskMin) * 60 + Number(taskSec)
        if(text.trim() && totalSeconds > 0) {
            onItemAdded(text, totalSeconds)
            setText('')
            setMin('')
            setSec('')
        }
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

export default NewTaskForm
