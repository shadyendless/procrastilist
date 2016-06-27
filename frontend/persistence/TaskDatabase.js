export default class TaskDatabase {
  getAll () {
    return new Promise((resolve, reject) => {
      fetch('/api/tasks', {
        method: 'get'
      }).then(response => {
        response.json().then(tasks => {
          resolve(tasks)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }

  createTask (taskName, urgency, subTasks) {
    return new Promise((resolve, reject) => {
      fetch('/api/tasks/create', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'text/json'
        }),
        body: JSON.stringify({
          data: {
            task: taskName,
            urgency: urgency,
            subtasks: subTasks
          }
        })
      }).then(response => {
        response.json().then(task => {
          resolve(task)
        })
      }).catch(err => {
        reject(err)
      })
    })
  }

  toggleTaskCompletion (task) {
    return new Promise((resolve, reject) => {
      fetch(`/api/tasks/${task.id}`, {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'text/json'
        }),
        body: JSON.stringify({
          data: {
            completed: !task.completed
          }
        })
      }).then(response => {
        resolve(response.status)
      }).catch(err => {
        reject(err)
      })
    })
  }

  deleteTask (taskId) {
    return new Promise((resolve, reject) => {
      fetch(`/api/tasks/${taskId}`, {
        method: 'delete'
      }).then(response => {
        resolve(response.status)
      }).catch(err => {
        reject(err)
      })
    })
  }

  deleteSubtask (taskId, subtaskId) {
    return new Promise((resolve, reject) => {
      fetch(`/api/subtasks/${subtaskId}`, {
        method: 'delete'
      }).then(response => {
        resolve(200)
      }).catch(err => {
        reject(err)
      })
    })
  }
}
