// static imports
require('../assets/css/q-dict-front/core.scss')

// js
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import App from './containers/App'

import store from './store/store'



const root = document.getElementById('q-dict-front')

render(
    <App store={ store }/>, 
    root
)
