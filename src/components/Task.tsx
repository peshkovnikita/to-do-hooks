import {useEffect, useState, useRef} from 'react'
import { formatDistanceToNow } from 'date-fns'

function Task({ id, description, seconds, isEditing, isDone, creationTime, onDelete, onDone, makeEditable, onUpdate }) {

    const [time, setTime] = useState(seconds)
    const [isRunning, setRun] = useState(false)
    const [taskText, setTaskText] = useState(description)
    const intervalRef = useRef(0)

    const min = Math.floor(time / 60)
    const sec = time - min * 60 === 0 ? 0 : time - min * 60

    let stateStyle = `${isEditing ? 'editing' :  isDone ? 'completed' : ''}`
    const doneStyle = isDone ? {color: '#cdcdcd', cursor: 'initial'} : {}

    const onTaskChange = (e) => setTaskText(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault()
        if (taskText.trim()) {
            onUpdate(id, taskText)
        }
    }

    const startTimer = () => {
        if(isRunning || time === 0) return;

        setRun(true)
        intervalRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current)
                    setRun(false)
                    return 0
                }
                return prev - 1
            })
        }, 1000)
    }

    const pauseTimer = () => {
        clearInterval(intervalRef.current)
        setRun(false)
    }

    const onTaskDone = () => {
        onDone()
        if(isRunning) {
            clearInterval(intervalRef.current)
            setRun(false)
        }
    }

    useEffect(() => {
        return () => clearInterval(intervalRef.current)
    }, [])

    const editInput = <form action='' onSubmit={ onSubmit }>
                          <input type='text' className='edit' value={ taskText } onChange={ onTaskChange } autoFocus />
                      </form>

    return (
        <li className={stateStyle}>
            <div className='view'>
                <input className='toggle' type='checkbox' onClick={ onTaskDone } defaultChecked={ isDone } />
                <label>
                    <span className='description'>{description}</span>
                    <span className='timer' style={doneStyle}>
                        {min > 9 ? min : `0${min}`}:{sec > 9 ? sec : `0${sec}`}
                    </span>
                    <span className='created'>{formatDistanceToNow(creationTime, {
                        includeSeconds: true,
                        addSuffix: true,
                    })}</span>
                </label>
                <button type='button' className='icon icon-edit' onClick={ makeEditable } style={ doneStyle } disabled={ isDone } />
                <button type='button' className='icon icon-destroy' onClick={ onDelete } />
                {isRunning ?
                    <button type='button' className='icon icon-pause' onClick={ pauseTimer } style={doneStyle} disabled={isDone}/> :
                    <button type='button' className='icon icon-play' onClick={ startTimer } style={doneStyle} disabled={isDone}/>
                }
            </div>
            { isEditing ? editInput : null}
        </li>
    )
}

export default Task