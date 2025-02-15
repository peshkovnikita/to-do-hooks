import TasksFilter from './TasksFilter'

function Footer({ tasksLeft = 0, onClearAllCompleted, onToggleFilter, filterState }) {

    return (
        <footer className='footer'>
            <span className='todo-count'>
                {`${tasksLeft} tasks left`}
            </span>
            <TasksFilter
                filterState={filterState}
                onToggleFilter={onToggleFilter}
            />
            <button type='button' className='clear-completed' onClick={ onClearAllCompleted }>
                Clear completed
            </button>
        </footer>
    )
}

export default Footer