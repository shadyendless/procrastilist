import React from 'react'
import ReactDOM from 'react-dom'
import TaskList from './TaskList'
import CreateTaskPanel from './CreateTaskPanel'

const App = () => <div className="Container">
                    <CreateTaskPanel />
                    <div className="CurrentTasks">
                      <TaskList urgency='urgent' />
                      <TaskList urgency='important' />
                      <TaskList urgency='meh' />
                    </div>
                  </div>

export default App
