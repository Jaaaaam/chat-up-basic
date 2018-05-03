import React from 'react'

export default class ChatResponse extends React.Component {
    constructor() {
        super();

        this.state = {
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (e) {
        console.log(this.state.message);
        this.setState({
            message: e.target.value
        });
    }

    handleEnter (e, message) {
        if (e.key == 'Enter') {
            this.pushMessage(message);
        }
    }

    pushMessage (message) {
        if (message.trim() == '') return;
        this.props.pushMessage(message);
        this.setState({
            message: ''
        },
        () => {
            this.props.scrollToBottom();
        });
    }


    render() {
        return (
            <div class="chat-response">
                <textarea 
                    class="form-control"
                    id="exampleFormControlTextarea1" 
                    rows="3"
                    value={this.state.message}
                    onChange={this.handleChange}
                    onKeyPress={(e) => this.handleEnter(e, this.state.message)}>
                </textarea>
                <i class="fa fa-paper-plane" onClick={() => this.pushMessage(this.state.message)} ></i>
            </div>
        )
    }
}