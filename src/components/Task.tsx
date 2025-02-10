import { formatDistanceToNow } from 'date-fns'
import {useState} from "react";

export default function Task(props) {
    const { description, seconds, isEditing, isDone, creationTime } = props

    const deleteHandler = () => {
        props.onDelete()
    }

    const [time, setTime] = useState(seconds)
    const min = Math.floor(time / 60)
    const sec = time - min * 60 === 0 ? 0 : time - min * 60
    
    return (
        <li>
            <div className='view'>
                <input className='toggle' type='checkbox' />
                <label>
                    <span className='description'>{description}</span>
                    <span className='timer'>
                        {min > 9 ? min : `0${min}`}:{sec > 9 ? sec : `0${sec}`}
                    </span>
                    <span className='created'>{formatDistanceToNow(creationTime, {
                        includeSeconds: true,
                        addSuffix: true,
                    })}</span>
                </label>
                <button type='button' className='icon icon-edit' />
                <button type='button' onClick={deleteHandler} className='icon icon-destroy' />
            </div>
        </li>
    )
}

