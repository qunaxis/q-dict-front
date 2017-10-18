// css imports
require('../assets/css/q-dict-front/core.scss')

// js
import "babel-polyfill"
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './containers/App'

import store from './store/store'

const root = document.getElementById('q-dict-front')


ReactDOM.render((
  <AppContainer>
    <App store={ store }/>
  </AppContainer>
), root)


if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.render((
      <AppContainer>
        <App store={ store }/>
      </AppContainer>
    ), root);
  })
}
