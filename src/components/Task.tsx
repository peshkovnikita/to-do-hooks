import { formatDistanceToNow } from 'date-fns'
import { useState } from "react";

function Task({ id, description, seconds, isEditing, isDone, creationTime, onDelete, onDone, onToggleEditing, onUpdate }) {

    const [time, setTime] = useState(seconds)
    const [taskText, setTaskText] = useState(description)

    const min = Math.floor(time / 60)
    const sec = time - min * 60 === 0 ? 0 : time - min * 60

    let stateStyle = `${isEditing ? 'editing' :  isDone ? 'completed' : ''}`
    const doneStyle = isDone ? {color: '#cdcdcd'} : {}
    
    const onTaskChange = (e) => setTaskText(e.target.value)

    const onEditing = () => !isDone ? onToggleEditing() : void 0

    const onSubmit = (e) => {
        e.preventDefault()
        if(taskText.trim()) {
            onUpdate(id, taskText)
            onToggleEditing()
        }
    }

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
                <button type='button' className='icon icon-edit' onClick={ onEditing } />
                <button type='button' className='icon icon-destroy' onClick={ onDelete } />
            </div>
            { isEditing ?
                <form action='' onSubmit={onSubmit}>
                    <input type='text' className='edit' value={taskText} onChange={onTaskChange} autoFocus />
                </form>
                : null }
        </li>
    )
}

export default Task