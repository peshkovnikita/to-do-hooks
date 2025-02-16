import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

function Task({ id, description, seconds, isEditing, isDone, creationTime, onDelete, onDone, onToggleEditing, onUpdate }) {

    const [time, setTime] = useState(seconds)
    const [taskText, setTaskText] = useState(description)

    const min = Math.floor(time / 60)
    const sec = time - min * 60 === 0 ? 0 : time - min * 60

    let stateStyle = `${isEditing ? 'editing' :  isDone ? 'completed' : ''}`
    const doneStyle = isDone ? {color: '#cdcdcd'} : {}

    const onTaskChange = (e) => setTaskText(e.target.value)

    const onSubmit = (e) => {
        e.preventDefault()
        onUpdate(id, taskText)
    }

    const editInput = <form action='' onSubmit={ onSubmit }>
                        <input type='text' className='edit' value={ taskText } onChange={ onTaskChange } autoFocus />
                    </form>

    return (
        <li className={stateStyle}>
            <div className='view'>
                <input className='toggle' type='checkbox' onClick={ onDone } defaultChecked={ isDone } />
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
                <button type='button' className='icon icon-edit' onClick={ onToggleEditing } style={ doneStyle } disabled={ isDone } />
                <button type='button' className='icon icon-destroy' onClick={ onDelete } />
            </div>
            { isEditing ? editInput : null}
        </li>
    )
}

export default Task