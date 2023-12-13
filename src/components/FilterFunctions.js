import react from 'react'
import NameSort from './NameSort' 
import DeadlineSort from './DeadlineSort'
import ToggleCompleted from './ToggleCompleted'
import DateSelect from './DateSelect'

export default function FilterFunctions(props) {
    return (

        <div className='task-filters task-input-container'>
            <NameSort/>
            <DeadlineSort />
            <ToggleCompleted/>
            <DateSelect />
        </div>
    ) 
}