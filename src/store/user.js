import { observable, computed, action } from 'mobx';
import axios from 'axios'

class User {
    @observable name
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
        axios.get('/auth/vk').then(user => {
            this.user = user
        })
    }
}

export default User