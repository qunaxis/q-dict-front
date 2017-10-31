import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'


@inject('store')
@observer
export default class Auth extends Component {
    handleVkAuthClick = () => {
        console.log('handleVkAuthClick')
        this.props.store.user.authVk()
    }
    render() {
        return (
            <button onClick={ this.handleVkAuthClick }>VK AUTH</button>
        )
    }
}