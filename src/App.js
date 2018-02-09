import React, { Component } from 'react';
import './App.css';

import recognizeMic from 'watson-speech/speech-to-text/recognize-microphone'

class App extends Component {
  state = {
    text: ''
  }

  handleOnClick = () => {
    fetch('http://localhost:3002/api/speech-to-text/token')
      .then(function(response) {
        return response.text()
      }).then(token => {
        var stream = recognizeMic({
          token: token,
          objectMode: true,
          extractResults: true,
          format: false
        })

        stream.on('data', data => {
          this.setState({
            text: data.alternatives[0].transcript
          })
        })

        stream.on('error', err => {
          console.log(err)
        })

        document.querySelector('#stop').onclick = stream.stop.bind(stream)
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    return (
      <div className="App">
        <button className="btn" onClick={ this.handleOnClick }>
          Listen to microphone
        </button>
        <div className="text-div">{ this.state.text }</div>
      </div>
    );
  }
}

export default App;
