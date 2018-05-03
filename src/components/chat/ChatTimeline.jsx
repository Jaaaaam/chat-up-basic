import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from '../../actions'

class ChatTimeline extends React.Component {
    returnMessages () {
        return this.props.chatlogs.map(message => {
            return (message.sender.id == this.props.user.loggedInUser.id)
                ? this.fromOperator(message) : this.fromClient(message)
        })
    }

    fromOperator (message) {
        var template = (
            <div class="row">
                <div class="col-sm-12">
                    <div class="chat-bubble pull-right">
                        <div class="chat-text">
                            { message.message }
                        </div>
                    </div>
                </div>
            </div>
        )
        return template
    }
    
    fromClient (message) {
        var template = (
            <div class="row">
                <img src={ message.sender.img } class="round-image" />
                <div class="chat-bubble gray-background">
                    <div class="chat-text gray-text">
                        { message.message }
                    </div>
                </div>
            </div>
        )
    
        return template
    }

    render() {
        return (
            <div class="chat-timeline scrollable">
                <div class="container-fluid">
                    { this.returnMessages() }
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

export default connect(mapStatetoProps)(ChatTimeline)