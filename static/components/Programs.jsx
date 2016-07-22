import React from 'react'
import DataManager from './DataManager.js'
import Link from 'react-router/lib/Link'
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
    let programs = DataManager.load('programs') || {}
    this.setState({ programs })
  }

  delete (name) {
    let programs = this.state.programs
    if (programs[name] !== undefined) {
      delete programs[name]
      DataManager.save('programs', programs)
      this.setState({ programs })
    }
  }

  newProgramNameChanged (event) {
    this.setState({ newProgramName: event.target.value })
  }

  render () {
    return <div className="programs" style={this.props.style}>
      {Object.keys(this.state.programs).map(program =>
        <Program key={program} name={program}
          program={this.state.programs[program]}
          onDelete={this.delete.bind(this)}
          createNewTab={this.props.createNewTab}
        />
      )}
      <input type="text" placeholder="Create new program..." onChange={this.newProgramNameChanged.bind(this)}/>
      <Link className="button" to={'/editor/' + this.state.newProgramName} disabled={!this.state.newProgramName}>Edit</Link>
    </div>
  }
}

export default Programs
