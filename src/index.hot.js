// css imports
require('../assets/css/q-dict-front/core.scss')

// js
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'

import MobxRouter from './router'

const root = document.getElementById('q-dict-front')


ReactDOM.render((
  <AppContainer>
    <MobxRouter />
  </AppContainer>  
), root)


if (module.hot) {
  module.hot.accept('./containers/App', () => {
    ReactDOM.render((
      <AppContainer>
        <MobxRouter />
      </AppContainer> 
    ), root);
  })
}
