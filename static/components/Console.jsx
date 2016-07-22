import React from 'react'
import DataManager from 'components/DataManager.js'

class Console extends React.Component {

  componentWillUnmount () {
    if (this.state.lc2console) {
      this.state.lc2console.output = function () {
        console.log('ConsoleComponent is not mounted')
        console.log(String.fromCharCode(this.outputKey))
      }.bind(this.state.lc2console)
    }
    DataManager.save('console', this.state.buffer)
  }

  componentWillMount () {
    let lc2 = this.props.lc2
    let lc2console = lc2.peripherals[parseInt('FF16', 16)]
    if (!lc2console) {
      this.setState({ error: 'LC2 Console not available' })
    } else {
      lc2console.output = () => {
        let str = String.fromCharCode(lc2console.outputKey)
        this.setState({ buffer: this.state.buffer + str })
      }
      this.setState({ error: null, buffer: DataManager.load('console') || '' })
    }
  }

  clear () {
    this.setState({ buffer: '' })
  }

  getContent () {
    if (this.state.error) {
      return 'Error: ' + this.state.error
    } else if (typeof this.state.buffer === 'string' && this.state.buffer.length > 0) {
      return this.state.buffer
    } else {
      return <span className="console-empty">Empty...</span>
    }
  }

  render () {
    return <div className="console">
      <div className="console-toolbar">
        <div className="text">Console</div>
        <div className="buttons">
          <button onClick={this.clear.bind(this)}>Clear</button>
        </div>
      </div>
      <div className="console-content">
        {this.getContent()}
      </div>
    </div>
  }

}

export default Console
