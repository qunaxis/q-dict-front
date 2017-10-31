import { observable, computed, action } from 'mobx';
import axios from 'axios'

class User {
    constructor() {
        this.name = undefined
    }
    @action isLoggedIn = (nextState, replace) => {
        if(this.name === undefined) {
            return false
        } else {
            return true
        }
    }

    @action authVk() {
        console.log('auth-vk')
        axios.get('//q-dict-server.herokuapp.com/auth/vk').then(user => {
            this.user = user
        })
    }
}

export default User