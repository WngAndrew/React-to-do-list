import { text } from '@fortawesome/fontawesome-svg-core'
import react,{useState} from 'react'

export default function TaskInput(props) { 
    const [textValue, setTextValue] = useState('')
    const [dateValue, setDateValue] = useState('')

    const handleTextChange = (event) => setTextValue(event.target.value)
    const handleDateChange = (event) => textValue === '' ? null : setDateValue(event.target.value)

    const handleTaskSubmit = (event) => {
        if (textValue === '') { 
            event.preventDefault()
            return
        }
        if (!isValidDate(dateValue)) {
            event.preventDefault()
            return
        }
        props.addTask(textValue, dateValue)
        setTextValue('')
        setDateValue('')
        event.preventDefault()
    }

    function isValidDate(dateString) {
        const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
        return datePattern.test(dateString) && !isNaN(Date.parse(dateString));
    }
    

    return (
        <div className='task-input-container'>
            <h1>To-do List</h1>
            <form className="new-task-form" onSubmit={handleTaskSubmit}>
                <input 
                    type="text"
                    className="new-task-input" 
                    placeholder="Enter task here"  
                    autocomplete="off" 
                    value={textValue}
                    onChange={handleTextChange}
                />
                <input 
                    type="text" 
                    className="new-task-deadline" 
                    placeholder="MM/DD/YY"  
                    autocomplete="off" 
                    value={dateValue}
                    onChange={handleDateChange}
                />
                <input 
                    type="submit" 
                    className="new-task-submit" 
                    value="Add task"
                />
            </form>
        </div>
    )
}