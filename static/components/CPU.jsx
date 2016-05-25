import React from 'react'
import PagedMemoryViewer from 'components/PagedMemoryViewer.jsx'
import RegisterViewer from 'components/RegisterViewer.jsx'

class CPU extends React.Component {

  componentWillMount () {
    this.setState({ running: false })
  }

  reset () {
    this.props.route.lc2.reset()
    this.forceUpdate()
  }

  jump () {
    if (this.state.jumpTo >= 0 && this.state.jumpTo <= Math.pow(2, 16) - 1) {
      this.props.route.lc2.pc = this.state.jumpTo
      this.forceUpdate()
    }
  }

  step () {
    this.props.route.lc2.step(() => {
      this.forceUpdate()
    })
  }

  run () {
    this.setState({ running: true })
    this.props.route.lc2.run(() => {
      console.log('done')
      this.setState({ running: false })
    })
  }

  jumpAddrChanged (event) {
    this.setState({ jumpTo: event.target.value })
  }

  render () {
    let lc2 = this.props.route.lc2
    return <div>
      <button onClick={this.reset.bind(this)}>Reset</button>
      <button onClick={this.step.bind(this)}>Step</button>
      <button onClick={this.run.bind(this)}>Run</button>
      {this.state.running ? 'Running, please wait...' : ''}
      <div>
        <input type="text" onChange={this.jumpAddrChanged.bind(this)} placeholder="Jump to (hex)..."/>
        <button onClick={this.jump.bind(this)}>Jump</button>
      </div>
      <RegisterViewer lc2={lc2} />
      <PagedMemoryViewer lc2={lc2} start={0} perPage={20} />
    </div>
  }
}

export default CPU
