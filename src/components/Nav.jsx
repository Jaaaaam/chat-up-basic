import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers, changeLoggedInUser } from '../actions'

class Nav extends React.Component {
    constructor(props) {
        super(props);

        console.log('nav props', this.props)
    }
    changeLoggedInUser(user) {
        this.props.socket.emit('CREATE_ROOM', { userID: user.id })
        this.props.changeLoggedInUser(user)
    }
    renderUsers() {
        return this.props.user.users.map((user) => {
            return (
                <a class="dropdown-item" href="#" onClick = { ()  => this.changeLoggedInUser(user)} >{user.name}</a>
            )
        })
    }
    render() {
        return (
            <div class="nav">
                <div class="nav-menu">
                    <i class="fa fa-home fa-lg"></i>
                    <i class="fa fa-tasks"></i>
                </div>
                <h2 class="nav-brand">ChatUp</h2>
                <div class="nav-profile pull-right">
                    <p class="nav-profile-name">
                        <i class="fa fa-caret-down" data-toggle="dropdown"></i>
                        { this.props.user.loggedInUser.name }
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            { this.renderUsers() }
                        </div>
                        <span class="nav-profile-img pull-right">
                            <img src={this.props.user.loggedInUser.img} class="round-image" />
                        </span>
                    </p> 
                </div>
            </div>
        )
    }
}

function mapStatetoProps (state) {
    return {
        user: state.users
    }
}

function matchDispatchToProps (dispatch) {
    return bindActionCreators({
        changeLoggedInUser
    }, dispatch)
}

export default connect(mapStatetoProps, matchDispatchToProps)(Nav)