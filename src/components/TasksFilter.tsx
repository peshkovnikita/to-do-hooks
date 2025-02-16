import { useState, MouseEvent } from "react";

type FilterState = 'all' | 'active' | 'completed'

type TasksFilterProps = {
    filterState: FilterState
    onToggleFilter: (filterState: FilterState) => void
}

function TasksFilter({ filterState, onToggleFilter }: TasksFilterProps) {

    const [filter, setFilter] = useState<FilterState>(filterState)

    const onChangeFilter = (e: MouseEvent<HTMLButtonElement>) => {
        const newFilter = e.currentTarget.value as FilterState
        onToggleFilter(newFilter)
        setFilter(newFilter)
    }

    return (
        <ul className='filters'>
            <li>
                <button type='button' value='all' onClick={ onChangeFilter } className={filter === 'all' ? 'selected' : ''}>
                    All
                </button>
            </li>
            <li>
                <button type='button' value='active' onClick={ onChangeFilter } className={filter === 'active' ? 'selected' : ''}>
                    Active
                </button>
            </li>
            <li>
                <button type='button' value='completed' onClick={ onChangeFilter } className={ filter === 'completed' ? 'selected' : '' }>
                    Completed
                </button>
            </li>
        </ul>
    )
}

export default TasksFilter