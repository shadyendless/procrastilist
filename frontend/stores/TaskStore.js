import { observable, computed, action, asFlat } from 'mobx'
import _ from 'lodash'

export default class TaskStore {
  @observable tasks = []
  @observable isLoading = false

  fetchTasks() {
    this.isLoading = true
    fetch('/api/tasks', {
      method: 'get'
    }).then(response => {
      response.json().then(tasks => {
        this.tasks = tasks.map(task => {
          return {
            id: task.id,
            task: task.task,
            urgency: task.urgency,
            completed: task.completed === '0' ? false : true,
            subTasks: task.sub_tasks.map(subTask => {
              return {
                id: subTask.id,
                task: subTask.task
              }
            })
          }
        })
        this.isLoading = false
      })
    }).catch(err => {
      console.log(err)
    })
  }

  @action createTask(newTask) {
    this.tasks.unshift(newTask)
  }

  @action finishTask(taskId) {
    const taskIndex = _.findIndex(this.tasks, (task) => task.id === taskId)

    fetch(`/api/tasks/${taskId}/edit`, {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'text/json'
      }),
      body: JSON.stringify({
        data: {
          completed: !this.tasks[taskIndex].completed
        }
      })
    }).then(response => {
      if (response.status === 200) this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed
    }).catch(err => {
      console.log(err)
    })
  }

  @action deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}/delete`, {
      method: 'post'
    }).then(response => {
      if (response.status === 200) this.tasks = this.tasks.filter(task => task.id !== taskId)
    }).catch(err => {
      console.log(err)
    })
  }

  @action deleteSubtask(taskId, subtaskId) {
    const taskIndex = _.findIndex(this.tasks, (task) => task.id === taskId)
    fetch(`/api/subtasks/${subtaskId}/delete`, {
      method: 'post'
    }).then(response => {
      this.tasks[taskIndex].subTasks =
        this.tasks[taskIndex].subTasks.filter(subTask => subTask.id !== subtaskId)
    }).catch(err => {
      console.log(err)
    })
  }

  @computed get urgentTasks() {
    return this.tasks.filter(task => {
      return task.urgency === 'urgent'
    })
  }

  @computed get importantTasks() {
    return this.tasks.filter(task => {
      return task.urgency === 'important'
    })
  }

  @computed get mehTasks() {
    return this.tasks.filter(task => {
      return task.urgency === 'meh'
    })
  }
}
