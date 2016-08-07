import React from 'react'
import PagedMemoryViewer from 'components/PagedMemoryViewer.jsx'
import RegisterViewer from 'components/RegisterViewer.jsx'
import Console from 'components/Console.jsx'
import { LC2, Assembler } from 'lc2.js'
import Editor from 'components/Editor.jsx'
import DataManager from './DataManager.js'

class CPU extends React.Component {

  componentWillMount () {
    let programs = DataManager.load('programs') || {}
    let name = this.props.name
    let code = ''
    if (programs[name] && programs[name].code) {
      code = programs[name].code
    }
    this.setState({
      lc2: new LC2(),
      running: false,
      code
    })
  }

  componentWillUnmount () {
    this.state.lc2.turnOff()
    this.setState({ running: false })
    // this.save(this.state.code)
  }

  compile (code = this.state.code) {
    let assembler = new Assembler()
    let assembled = assembler.assemble(this.state.code)
    let compiled = assembler.toBinary(assembled)
    let binary = DataManager.convertBinaryToArray(compiled)
    return binary
  }

  save (code = this.state.code) {
    let binary = this.compile(code)
    console.log('save', code, binary)
    DataManager.set('programs', this.props.name, { code, binary })
  }

  reset () {
    this.state.lc2.reset(true)
    let binary = this.compile(this.state.code)
    if (typeof binary === 'object' && binary.length > 0) {
      this.state.lc2.loadProgram(binary)
    }
    this.forceUpdate()
  }

  jump () {
    let dest = parseInt(this.state.jumpTo, 16)
    if (dest >= 0 && dest <= Math.pow(2, 16) - 1) {
      this.state.lc2.pc = dest
      this.forceUpdate()
    }
  }

  step () {
    this.state.lc2.step(() => {
      this.forceUpdate()
    })
  }

  toggleRun () {
    if (this.state.running) {
      this.state.lc2.turnOff()
    } else {
      this.setState({ running: true }, () => {
        this.state.lc2.run(null, this.onInstructionDone.bind(this))
      })
    }
  }

  onInstructionDone (cpuOff, done) {
    if (this.state.running) {
      this.setState({ running: !cpuOff }, () => {
        this.forceUpdate(() => done())
      })
    }
  }

  jumpAddrChanged (event) {
    this.setState({ jumpTo: event.target.value })
  }

  onEditorChanged (code) {
    console.log('onEditorChanged:', code)
    this.setState({ code })
  }

  render () {
    let resetButtonString = this.state.code.length > 0 ? 'Reload' : 'Reset'
    let lc2 = this.state.lc2
    return <div className="cpu" style={this.props.style}>
      <Editor name={this.props.name} onSave={this.onEditorChanged.bind(this)} onReady={this.reset.bind(this)}/>
      <div className="controls">
        <button onClick={() => this.save()}>Save</button>
        <button onClick={this.reset.bind(this)}>{resetButtonString}</button>
        <button onClick={this.step.bind(this)}>Step</button>
        <button onClick={this.toggleRun.bind(this)}>
          {this.state.running ? 'Halt' : 'Run' }
        </button>
        <input type="text" onChange={this.jumpAddrChanged.bind(this)} placeholder="Jump to (hex)..."/>
        <button onClick={this.jump.bind(this)}>Jump</button>
      </div>
      <RegisterViewer lc2={lc2} />
      <PagedMemoryViewer lc2={lc2} start={0} perPage={20} />
      <Console lc2={lc2} />
    </div>
  }
}

export default CPU
