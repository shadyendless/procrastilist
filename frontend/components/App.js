import React from 'react'
import ReactDOM from 'react-dom'
import TaskList from './TaskList'

const App = () => <div className="Container">
                    <div className="CreateTaskPanel"></div>
                    <div className="CurrentTasks">
                      <TaskList urgency='urgent' />
                      <TaskList urgency='important' />
                      <TaskList urgency='meh' />
                    </div>
                  </div>

export default App
