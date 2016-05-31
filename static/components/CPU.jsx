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
    let dest = parseInt(this.state.jumpTo, 16)
    if (dest >= 0 && dest <= Math.pow(2, 16) - 1) {
      this.props.route.lc2.pc = dest
      this.forceUpdate()
    }
  }

  step () {
    this.props.route.lc2.step(() => {
      this.forceUpdate()
    })
  }

  toggleRun () {
    if (this.state.running) {
      this.props.route.lc2.turnOff()
    } else {
      this.setState({ running: true })
      this.props.route.lc2.run(this.onDoneRunning.bind(this), this.onInstructionDone.bind(this))
    }
  }

  onDoneRunning (cpuOff) {
    console.log('Done:', cpuOff)
    this.setState({ running: !cpuOff })
  }

  onInstructionDone (cpuOff, done) {
    this.forceUpdate(() => {
      done()
    })
  }

  jumpAddrChanged (event) {
    this.setState({ jumpTo: event.target.value })
  }

  render () {
    let lc2 = this.props.route.lc2
    return <div className="cpu">
      <div className="controls">
        <button onClick={this.reset.bind(this)}>Reset</button>
        <button onClick={this.step.bind(this)}>Step</button>
        <button onClick={this.toggleRun.bind(this)}>
          {this.state.running ? 'Halt' : 'Run' }
        </button>
        <input type="text" onChange={this.jumpAddrChanged.bind(this)} placeholder="Jump to (hex)..."/>
        <button onClick={this.jump.bind(this)}>Jump</button>
      </div>
      <RegisterViewer lc2={lc2} />
      <PagedMemoryViewer lc2={lc2} start={0} perPage={20} />
    </div>
  }
}

export default CPU
