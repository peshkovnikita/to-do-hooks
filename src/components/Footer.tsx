import TasksFilter from './TasksFilter'

type FilterState = 'all' | 'active' | 'completed'

interface IFooterProps {
    tasksLeft: number
    onClearAllCompleted: () => void
    onToggleFilter: (filterState: FilterState) => void
    filterState: FilterState
}

function Footer({ tasksLeft = 0, onClearAllCompleted, onToggleFilter, filterState }: IFooterProps) {

    return (
        <footer className='footer'>
            <span className='todo-count'>{ `${tasksLeft} tasks left` }</span>
            <TasksFilter filterState={filterState} onToggleFilter={onToggleFilter}/>
            <button type='button' className='clear-completed' onClick={ onClearAllCompleted }>
                Clear completed
            </button>
        </footer>
    )
}

export default Footer