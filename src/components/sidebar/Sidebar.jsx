import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers,  changeSelectedUser } from '../../actions'

class Sidebar extends React.Component {
    joinRoom(user) {
        this.props.socket.emit('LEAVE_ROOM', {userID: this.props.user.selectedUser.id})
        console.log(this.props)
        this.props.changeSelectedUser(user);
        this.props.socket.emit('JOIN_ROOM', {userID: user.id})
        console.log(this.props)
    }
    renderContacts() {
        return this.props.user.users.map((user) => {
            return (
                <li onClick = { () => this.joinRoom(user) } >
                    <div class="contact-image-container">
                        <img class="round-image" src={user.img} />
                    </div>
                    <div class="contact-details">
                        <p class="contact-name"> {user.name} <i class="fa fa-ellipsis-v pull-right"></i> </p>
                        <p class="last-message">{user.lastMessage}</p>
                    </div>
                </li>
            )
        })
    }
    render () {
        return (
            <div class="sidebar">
                <div class="sidebar-search">
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search..." />
                </div>
                <ul class="contact">
                    { this.renderContacts() }
                </ul>
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
        changeSelectedUser
    }, dispatch)
}

export default connect(mapStatetoProps, matchDispatchToProps)(Sidebar)