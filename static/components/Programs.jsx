import React from 'react'
import DataManager from './DataManager.js'
import CPU from 'components/CPU.jsx'

class Program extends React.Component {

  delete (name) {
    this.props.onDelete(name)
  }

  open (name) {
    this.props.createNewTab(name, CPU)
  }

  render () {
    let lines = this.props.program.code ? this.props.program.code.split('\n').length : '?'
    let size = this.props.program.binary ? this.props.program.binary.length * 2 : '?'
    return <div className="program" style={this.props.style}>
      <div className="title">
        <b>{this.props.name}</b> ({lines} lines) ({size} bytes)
      </div>
      <div className="buttons">
        {this.props.createNewTab ? <button onClick={() => this.open(this.props.name)}>Open</button> : <span/>}
        {this.props.onDelete ? <button onClick={() => this.delete(this.props.name)}>Delete</button> : <span/>}
      </div>
    </div>
  }
}

class Programs extends React.Component {

  componentWillMount () {
    this.setState({ newProgramName: '' })
  }

  delete (name) {
    let programs = DataManager.load('programs') || {}
    if (programs[name] !== undefined) {
      delete programs[name]
      DataManager.save('programs', programs)
    }
  }

  newProgramNameChanged (event) {
    this.setState({ newProgramName: event.target.value })
  }

  newProgram () {
    this.props.createNewTab(this.state.newProgramName, CPU)
    this.setState({ newProgramName: '' }, () => {
      this.forceUpdate()
    })
  }

  render () {
    let programs = DataManager.load('programs') || {}
    return <div className="programs" style={this.props.style}>
      {Object.keys(programs).map(program =>
        <Program key={program} name={program}
          program={programs[program]}
          onDelete={this.delete.bind(this)}
          createNewTab={this.props.createNewTab}
        />
      )}
      <input type="text" placeholder="Create new program..." onChange={this.newProgramNameChanged.bind(this)} value={this.state.newProgramName}/>
      <button onClick={this.newProgram.bind(this)} disabled={!this.state.newProgramName}>Edit</button>
    </div>
  }
}

export default Programs
