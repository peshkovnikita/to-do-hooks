
export default function TasksFilter() {
        return (
            <ul className='filters'>
                <li>
                    <button type='button' value='all'>All</button>
                </li>
                <li>
                    <button type='button' value='active'>Active</button>
                </li>
                <li>
                    <button type='button' value='completed'>Completed</button>
                </li>
            </ul>
        )
}
