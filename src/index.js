import React from 'react'
import ReactDom from 'react-dom'

class App extends React.Component {
    render() {
        return (
            <div>
                Test
            </div>
        )
    }
}

ReactDom.render(<App />, window.document.getElementById("root"));