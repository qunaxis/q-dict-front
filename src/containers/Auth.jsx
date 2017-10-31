import React, { Component } from 'react'

@inject('store')
@observer
export default class Auth extends Component {
    handleVkAuthClick = () => {
        store.user.authVk()
    }
    render() {
        return (
            <button onClick={ () => { handleVkAuthClick } }>VK AUTH</button>
        )
    }
}