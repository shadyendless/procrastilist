import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

@observer(['store'])
class CreateTaskPanel extends Component {
  @observable taskName = ''
  @observable urgency = 'meh'
  subTasks = []

  createTask() {
    this.props.store.createTask(this.taskName, this.urgency, this.subTasks)
    .then(response => {
      this.taskName = ''
      this.urgency = 'meh'
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="CreateTaskPanel">
        <h1 className="CreateTaskPanel--Title">hold off on doing . . .</h1>
        <input type="text" className="CreateTaskPanel--TaskNameInput"
               placeholder="what do you have to do?"
               value={this.taskName}
               onChange={(e) => this.taskName = e.target.value} />
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
