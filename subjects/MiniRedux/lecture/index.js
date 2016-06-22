import React from 'react'
import App from './components/App'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

render((
  <Provider>
    <App/>
  </Provider>
), document.getElementById('app'))

////////////////////////////////////////////////////////////////////////////////
// - shared state (add sidebar)
// - drilling holes (remove action)
// - make store
// - show solution API

