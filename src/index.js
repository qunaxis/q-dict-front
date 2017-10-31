// static imports
require('../assets/css/q-dict-front/core.scss')

// js
import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'

import MobxRouter from './router'

render(
    <MobxRouter />,
    document.getElementById('root')
)
