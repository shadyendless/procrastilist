import { observable, computed, action, asFlat } from 'mobx'
import TaskDatabase from '../persistence/TaskDatabase'
import _ from 'lodash'

class TaskStore {
  @observable tasks = []
  @observable isLoading = false
  database = null

  constructor(database) {
    this.tasks = []
    this.isLoading = false
    this.database = database
  }

  @action fetchTasks() {
    this.isLoading = true
    this.database.getAll().then(tasks => {
      this.tasks = tasks.map(task => {
        return {
          id: task.id,
          task: task.task.toLowerCase(),
          urgency: task.urgency,
          completed: task.completed === '0' ? false : true,
          subTasks: task.sub_tasks.map(subTask => {
            return {
              id: subTask.id,
              task: subTask.task.toLowerCase()
            }
          })
        }
      })
      this.isLoading = false
    })
    .catch(err => {
      console.log(err)
    })
  }

  @action createTask(taskName, urgency, subTasks) {

    // Return a promise so that the UI layer can update appropriately
    // if the insert fails or succeeds.
    return new Promise((resolve, reject) => {
      this.database.createTask(taskName, urgency, subTasks.slice())
      .then(task => {
        this.tasks.unshift({
          id: task.id,
          task: task.task.toLowerCase(),
          urgency: task.urgency,
          completed: false,
          subTasks: task.sub_tasks.map(subTask => {
            return {
              id: subTask.id,
              task: subTask.task.toLowerCase()
            }
          })
        })
        resolve(201)
      })
      .catch(err => {
        reject(404)
      })
    })
  }

  @action toggleTaskCompletion(taskId) {
    const taskIndex = _.findIndex(this.tasks, (task) => task.id === taskId)

    this.database.toggleTaskCompletion(this.tasks[taskIndex])
    .then(responseCode => {
      if (responseCode === 200) this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed
    })
    .catch(err => {
      console.log(err)
    })
  }

  @action deleteTask(taskId) {
    this.database.deleteTask(taskId)
    .then(responseCode => {
      if (responseCode === 200) this.tasks = this.tasks.filter(task => task.id !== taskId)
    })
    .catch(err => {
      console.log(err)
    })
  }

  @action deleteSubtask(taskId, subtaskId) {
    const taskIndex = _.findIndex(this.tasks, (task) => task.id === taskId)

    this.database.deleteSubtask(taskId, subtaskId)
    .then(responseCode => {
      if (responseCode === 200)
        this.tasks[taskIndex].subTasks =
          this.tasks[taskIndex].subTasks.filter(subTask => subTask.id !== subtaskId)
    })
    .catch(err => {
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

const database = new TaskDatabase()
let taskStore = new TaskStore(database)
taskStore.fetchTasks()
export default taskStore
