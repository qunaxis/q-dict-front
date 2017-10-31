import React from 'react'
import {
    Router,
    Route,
    Link,
    Redirect
} from 'react-router-dom'
import { Provider } from 'mobx-react'

import App from './containers/App'
import Auth from './containers/Auth'

import store from './store/store'

import createBrowserHistory from 'history/createBrowserHistory'
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router'



const MobxRouter = () => {
    const browserHistory = createBrowserHistory()
    const routingStore = new RouterStore()
    
    const stores = {
        routing: routingStore,
        store: store
    }
    
    const history = syncHistoryWithStore(browserHistory, routingStore)

    const { user } = store

    return (
        <Provider { ...stores }>
            <Router history={ history }>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/auth">Auth</Link></li>
                    </ul>

                    <Route exact path="/" render={() => (
                        user.isLoggedIn() ? (
                            <App />
                        ) : (
                            <Redirect to="/auth"/>
                        )
                    )}/>
                    <Route exact path="/auth" component={ Auth }/>
                </div>                
            </Router>
        </Provider>    
    )
}

export default MobxRouter