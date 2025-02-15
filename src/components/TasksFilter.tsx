import { useState } from "react";

function TasksFilter({ filterState, onToggleFilter }) {

    const [filter, setFilter] = useState(filterState)

    const onChangeFilter = (e) => {
        const filterState = e.target.getAttribute('value')
        onToggleFilter(filterState)

        setFilter(filterState)
    }

    return (
        <ul className='filters'>
            <li>
                <button type='button' value='all' onClick={ onChangeFilter } className={filter === 'all' ? 'selected' : {}}>
                    All
                </button>
            </li>
            <li>
                <button type='button' value='active' onClick={ onChangeFilter } className={filter === 'active' ? 'selected' : {}}>
                    Active
                </button>
            </li>
            <li>
                <button type='button' value='completed' onClick={ onChangeFilter } className={ filter === 'completed' ? 'selected' : {} }>
                    Completed
                </button>
            </li>
        </ul>
    )
}

export default TasksFilter