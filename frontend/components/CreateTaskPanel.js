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
    this.props.store.createTask(this.taskName, this.urgency, this.subTasks)
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
    subTask.task = event.target.value.toLowerCase()
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
        <input type="text" className="CreateTaskPanel--TaskNameInput"
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
