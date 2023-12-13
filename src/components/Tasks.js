import React, {useState} from 'react'
import DisplayTasks from './DisplayTasks'


export default function Tasks(props) {
    //state for filter functions
    const [isCompleted, setIsCompleted] = useState(false)
    const [isNameSort, setIsNameSort] = useState(false)
    const [isDeadlineSort, setIsDeadlineSort] = useState(false)
    const [isDateSelect, setIsDateSelect] = useState(false)
    const [convertedDate, setConvertedDate] = useState('');

    //toggle functions
    const toggleCompleted = ()=> setIsCompleted(prevState => !prevState)  
    const toggleNameSort = ()=> setIsNameSort(prevState => !prevState)
    const toggleDeadlineSort = ()=> setIsDeadlineSort(prevState => !prevState)

    const handleDate = (event) => { 
        if (event.target.value === ''){
            setIsDateSelect(false)
        } else {
            setIsDateSelect(true)
        }
        const dateSplit = event.target.value.split('-')
        const convertedDate = [dateSplit[1], dateSplit[2], dateSplit[0]].join('/')
        setConvertedDate(convertedDate)
 
    }

    let taskElements = {...props.taskElements}
 
    if (isCompleted) {
        taskElements = {...props.completedTasks}
    }

    if (isDateSelect) {
        const filteredTasks = Object.entries(taskElements).reduce((acc, [task, date]) => {
          if (date === convertedDate) {
            acc[task] = date;
          }
          return acc;
        }, {});
        taskElements = {...filteredTasks}
    }

    if (isNameSort) {
        const taskCopy = {...taskElements}
        const sortedTaskCopy = Object.keys(taskCopy)
            .sort()
            .reduce((sorted, key) => {
                sorted[key] = taskCopy[key];
                return sorted;
            }, {})
        taskElements = {...sortedTaskCopy}
    }

    if (isDeadlineSort) {
        const deadlineCopy = { ...taskElements };
        const rawDeadlines = Object.entries(deadlineCopy).reduce((acc, [task, date]) => {
          acc[task] = convertDateToInt(date);
          return acc;
        }, {});
    
        const sortedDeadlines = Object.entries(rawDeadlines).sort((a, b) => a[1] - b[1]).reduce((acc, [task, date]) => {
            acc[task] = date;
            return acc;
          }, {});
          
          const formattedDeadlines = {};
          Object.entries(sortedDeadlines).forEach(([task, date]) => {
            const formattedDate = formatDateFromInt(date);
            formattedDeadlines[task] = formattedDate;
          });
      
          taskElements ={...formattedDeadlines}
      }
      
    function convertDateToInt(dateString) {
        // Split the date string into day, month, and year components
        const dateParts = dateString.split('/');
        const date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0])
        return date.getTime()
    }

    function formatDateFromInt(dateInt) {
        const date = new Date(dateInt)
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (

        <div>
            <div className='task-filters task-input-container'>
                <button 
                    className={`sort-by-name ${isNameSort ? 'function-on' : ''}`} 
                    btn onClick={toggleNameSort}>
                    Sort by name
                </button>
                <button 
                    className={`sort-by-deadline btn ${isDeadlineSort ? 'function-on' : ''}`} 
                    onClick={toggleDeadlineSort}>
                    Sort by deadline
                </button>
                <button 
                    className={`toggle-completed btn ${isCompleted ? 'function-on' : ''}`}  
                    onClick={toggleCompleted} >
                    Show completed tasks
                </button>
                <input 
                    type="date" 
                    className="date-input"
                    onChange={handleDate}
                /> 
            </div>

            <DisplayTasks 
                taskElements={taskElements} 
                deleteTask={props.deleteTask}
                completeTask={props.completeTask}
            /> 

        </div>
    )
}

