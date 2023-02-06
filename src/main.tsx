import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
        <Route path="/">
          <App />
        </Route>
    </Router>
  </React.StrictMode>,
)
