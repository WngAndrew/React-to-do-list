import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faCheck } from '@fortawesome/free-solid-svg-icons'


export default function DisplayTasks(props) { 
    const taskElements = props.taskElements

    return (
        Object.entries(taskElements).map(([task, date]) => {
            return (
                <main>
                    <div className="container tasks">
                        <div className="content">
                            <input 
                                type="text" 
                                className="text" 
                                value={task} 
                                readonly 
                            />
                        </div>
    
                        <div className="functions">

                            <p className="due-date">
                                {date === '' ? '' : `Due date: ${date}`}
                            </p>
                            <button className="delete">
                                <FontAwesomeIcon icon={faTrash} onClick={()=> props.deleteTask(task)}/>
                            </button>
                            <button className="save"> 
                                <FontAwesomeIcon icon={faCheck} onClick={()=> props.completeTask(task, date)}/>
                            </button>

                        </div>
                    </div>
                </main>

            )
        })  
    )
}