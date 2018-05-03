import React from 'react'

import ChatHeader from './ChatHeader'
import ChatTimeline from './ChatTimeline'
import ChatResponse from './ChatResponse'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers } from '../../actions'

class Chat extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chatlogs: [
                {
                    id: 1,
                    message: 'Message from operator',
                    sender: {
                        id: 1,
                        name: 'Benjamin Button',
                        img: '1.jpg'
                    },
                    time: '11:00'
                },
                {
                    id: 2,
                    message: 'This is a sample message',
                    sender: {
                        id: 2,
                        name: 'Bella Swan',
                        img: '2.jpg'
                    },
                    time: '11:05'
                },
                {
                    id: 3,
                    message: 'Hello. How are you?',
                    sender: {
                        id: 1,
                        name: 'Benjamin Button',
                        img: '1.jpg'
                    },
                    time: '11:06'
                },
                {
                    id: 4,
                    message: 'I am fine. Thank you.',
                    sender: {
                        id: 2,
                        name: 'Bella Swan',
                        img: '2.jpg'
                    },
                    time: '11:10'
                }
            ]
        }
    
        this.pushMessage = this.pushMessage.bind(this)
        // this.onPushMessage = this.onPushMessage.bind(this)

        this.props.socket.on('RECEIVE_MESSAGE', function(message) {
            console.log('this', this)
            onPushMessage(message)
        })

        const onPushMessage = (message) => {
            console.log('message', message)
            this.setState(prevState => ({
                chatlogs: [...prevState.chatlogs, message]
            }))
        }

        console.log('props', this.props)
    }

    scrollToBottom () {
        var el = document.getElementsByClassName('chat-timeline')[0]
        el.scrollTop = el.scrollHeight
    }

    pushMessage (message) {
        var newMessage = {
            id: this.state.chatlogs[this.state.chatlogs.length - 1].id + 1,
            message: message,
            sender: {
                id: this.props.user.loggedInUser.id,
                name: this.props.user.loggedInUser.name,
                img: this.props.user.loggedInUser.img
            },
            time: '11:00'
        }
        this.setState(prevState => ({
            chatlogs: [...prevState.chatlogs, newMessage]
        }))
        console.log('receiver id', this.props.user.selectedUser.id)
        this.props.socket.emit('SEND_MESSAGE', {
            message: newMessage,
            receiver: this.props.user.selectedUser.id
        })
    }

    render() {
        return (
            <div class="chat">
                <ChatHeader />
                <ChatTimeline chatlogs={this.state.chatlogs} />
                <ChatResponse pushMessage={this.pushMessage} scrollToBottom = {this.scrollToBottom}/>
            </div>
        )
    }
}

function mapStatetoProps (state) {
    return {
        user: state.users
    }
}

export default connect(mapStatetoProps)(Chat)