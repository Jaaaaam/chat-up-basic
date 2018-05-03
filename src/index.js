import React from 'react'
import ReactDom from 'react-dom'
import io from "socket.io-client"

import { Provider } from 'react-redux'

import store from './store/index'

import Nav from './components/Nav'
import Sidebar from './components/sidebar/Sidebar'
import Chat from './components/chat/Chat'

class App extends React.Component {
    constructor () {
        super()

        this.state = {
            socket: io('localhost:8080')
        }

    }

    componentWillMount() {

    }
    initSocket() {

    }
    render() {
        return (
            <div>
                <Nav socket={ this.state.socket } />
                <Sidebar socket={ this.state.socket } />
                <Chat socket={ this.state.socket } />
            </div>
        )
    }
}

ReactDom.render
(<Provider store={store}>
    <App />
</Provider>
    , 
window.document.getElementById("root")
);