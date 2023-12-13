import './App.css';
import TaskInput from './components/TaskInput';
import React, {useState} from 'react'
import Tasks from './components/Tasks';



function App() {
  const [taskElements, setTaskElements] = useState({})

  //states used for toggling completed tasks
  const [completedTasks, setCompletedTasks] = useState({})
  

  const addTask = (taskText, dueDate) => {
    const taskCopy = {...taskElements}
    taskCopy[taskText] = dueDate
    setTaskElements(taskCopy)
  }

  const deleteTask = (task) => {
    const taskCopy = {...taskElements}
    delete taskCopy[task]
    setTaskElements(taskCopy)
    }


  const completeTask = (task, date) => {
    const taskCopy = {...taskElements}
    const completedCopy = {...completedTasks}
    completedCopy[task] = date
    setCompletedTasks(completedCopy)
    delete taskCopy[task]
    setTaskElements(taskCopy)
  }

  return (
    <div className="App">
        <TaskInput addTask={addTask}/>
        <Tasks 
          taskElements={taskElements} 
          deleteTask={deleteTask}
          completeTask={completeTask}
          completedTasks={completedTasks}
        />
    </div>
  );
}

export default App;
