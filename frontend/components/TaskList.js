import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'

@observer(['store'])
class TaskList extends Component {
  finishTask(taskId) {
    this.props.store.finishTask(taskId)
  }

  deleteTask(taskId) {
    this.props.store.deleteTask(taskId)
  }

  deleteSubtask(taskId, subtaskId) {
    this.props.store.deleteSubtask(taskId, subtaskId)
  }

  getTaskList (task) {
    const subTasks = task.subTasks.map(subTask => {
      return (
        <li className="Task" key={subTask.id}>
         {subTask.task}
         <div className="TaskList--Buttons">
           <a href="#" className="TaskList--Button TaskList--Button__delete"
              onClick={this.deleteSubtask.bind(this, task.id, subTask.id)}></a>
           <a href="#" className="TaskList--Button TaskList--Button__edit"></a>
         </div>
       </li>
     )
    })

    return (
      <li className={`Task ${task.completed ? 'Task__finished' : ''}`} key={task.id}>
       {task.task}
       <div className="TaskList--Buttons">
         <a href="#" className="TaskList--Button TaskList--Button__delete"
            onClick={this.deleteTask.bind(this, task.id)}></a>
         <a href="#" className="TaskList--Button TaskList--Button__edit"></a>
         <a href="#" className="TaskList--Button TaskList--Button__finish"
            onClick={this.finishTask.bind(this, task.id)}></a>
       </div>
       <ul>
         {task.completed ? '' : subTasks}
       </ul>
     </li>
    )
  }

  render() {
    const {urgency, isLoading, store} = this.props
    let tasks = []
    switch (urgency) {
      case 'urgent':
        tasks = store.urgentTasks.map(task => {
          return this.getTaskList(task)
        })
        break
      case 'important':
        tasks = store.importantTasks.map(task => {
          return this.getTaskList(task)
        })
        break
      case 'meh':
        tasks = store.mehTasks.map(task => {
          return this.getTaskList(task)
        })
        break
    }

    if (tasks.length === 0) tasks = <em className='Task'>You have no {urgency} tasks to do.</em>

    return (
      <div className="TaskList">
       <h1 className={`TaskList--Title TaskList--Title__${urgency}`}>don't forget to . . .</h1>
       <ul>
         {store.isLoading ? <p>
                              Loading...
                            </p> : tasks}
       </ul>
     </div>
   )
  }
}

export default TaskList
