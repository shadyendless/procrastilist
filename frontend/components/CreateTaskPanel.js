import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer(['store'])
class CreateTaskPanel extends Component {
  @observable taskName = ''
  @observable urgency = 'meh'
  @observable subTasks = [{
    task: ''
  }]

  createTask() {
    // If there's no task, don't do anything.
    if (this.taskName === '') return

    // Filter out any tasks that do not have content.
    const subTasks = this.subTasks.filter(subTask => {
      return subTask.task !== ''
    })

    this.props.store.createTask(this.taskName, this.urgency, subTasks)
    .then(response => {
      this.taskName = ''
      this.urgency = 'meh'
      this.subTasks = [{
        task: ''
      }]
    })
    .catch(err => {
      console.log(err)
    })
  }

  subtaskChanged(subTask, index, event) {
    // Lowercase the subtask.
    subTask.task = event.target.value.toLowerCase()

    // If we've deleted the subtask and it is not the first subtask
    // in the array, then remove it.
    if (subTask.task === '' && index !== 0) {
      this.subTasks.splice(index, 1)
    }

    // Find out if there is an empty subtask at the end of the array already.
    // If there isn't, then we need to create a new one.
    if (this.subTasks[this.subTasks.length - 1].task !== '')
      this.subTasks.push({
        task: ''
      })
  }

  render() {
    const subTaskInputs = this.subTasks.map((subTask, index) => {
      return <input key={`${subTask.task}-${index}`}
                    type="text" className="CreateTaskPanel--SubtaskNameInput"
                    defaultValue={subTask.task}
                    placeholder='anything specific?'
                    onBlur={this.subtaskChanged.bind(this, subTask, index)} />
    })

    return (
      <div className="CreateTaskPanel">
        <h1 className="CreateTaskPanel--Title">hold off on doing . . .</h1>
        <input type="text"
               className={`CreateTaskPanel--TaskNameInput CreateTaskPanel--TaskNameInput__${this.urgency}`}
               placeholder="what do you have to do?"
               value={this.taskName}
               onChange={(e) => this.taskName = e.target.value.toLowerCase()} />
        {subTaskInputs}
        <div className="CreateTaskPanel--UrgencyButtons">
          <span className={
              `CreateTaskPanel--Button ${
                this.urgency === 'meh' ?
                'CreateTaskPanel--Button__meh__active' :
                'CreateTaskPanel--Button__meh'
              }`
             }
            onClick={() => this.urgency = 'meh'}>meh</span>
          <span className={
              `CreateTaskPanel--Button ${
                this.urgency === 'important' ?
                'CreateTaskPanel--Button__important__active' :
                'CreateTaskPanel--Button__important'
              }`
             }
            onClick={() => this.urgency = 'important'}>important</span>
          <span className={
              `CreateTaskPanel--Button ${
                this.urgency === 'urgent' ?
                'CreateTaskPanel--Button__urgent__active' :
                'CreateTaskPanel--Button__urgent'
              }`
             }
            onClick={() => this.urgency = 'urgent'}>urgent</span>
        </div>
        <span className="CreateTaskPanel--Button CreateTaskPanel--Button__create"
          onClick={this.createTask.bind(this)}>hold it off</span>
      </div>
    )
  }
}

export default CreateTaskPanel
