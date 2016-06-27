import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import TaskStore from './stores/TaskStore'
import App from './components/App'
import Header from './components/Header'

let store = new TaskStore()
store.fetchTasks()

ReactDOM.render(
  <div>
    <DevTools />
    <Header />
    <Provider store={store}>
      <App />
    </Provider>
    <footer className="Footer">
      hacked together hopelessly by ben littleton and jacob foster
    </footer>
  </div>,
  document.body
)
