import { formatDistanceToNow } from 'date-fns'
import { useState } from "react";

export default function Task({ description, seconds, isEditing, isDone, creationTime, onDelete, onDone }) {
    const [time, setTime] = useState(seconds)

    const min = Math.floor(time / 60)
    const sec = time - min * 60 === 0 ? 0 : time - min * 60

    let stateStyle = `${isEditing ? 'editing' :  isDone ? 'completed' : ''}`
    const doneStyle = isDone ? {color: '#cdcdcd'} : {}

    return (
        <li className={stateStyle}>
            <div className='view'>
                <input className='toggle' type='checkbox' onClick={ onDone } checked={ isDone } />
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
                <button type='button' className='icon icon-edit' />
                <button type='button' onClick={ onDelete } className='icon icon-destroy' />
            </div>
        </li>
    )
}

