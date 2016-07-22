import React from 'react'
import DataManager from './DataManager.js'
import Link from 'react-router/lib/Link'

class Program extends React.Component {

  load () {
    this.props.lc2.loadProgram(this.props.program.binary)
  }

  delete (name) {
    this.props.onDelete(name)
  }

  render () {
    let lines = this.props.program.code ? this.props.program.code.split('\n').length : '?'
    let size = this.props.program.binary ? this.props.program.binary.length * 2 : '?'
    return <div className="program">
      <div className="title">
        <b>{this.props.name}</b> ({lines} lines) ({size} bytes)
      </div>
      <div className="buttons">
        {this.props.program.code ? <Link className="button" to={'/editor/' + this.props.name}>Edit</Link> : <span/>}
        {this.props.program.binary ? <button onClick={this.load.bind(this)}>Load</button> : <span/>}
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
    return <div className="programs">
      {Object.keys(this.state.programs).map(program =>
        <Program key={program} name={program} lc2={this.props.route.lc2} program={this.state.programs[program]} onDelete={this.delete.bind(this)} />
      )}
      <input type="text" placeholder="Create new program..." onChange={this.newProgramNameChanged.bind(this)}/>
      <Link className="button" to={'/editor/' + this.state.newProgramName} disabled={!this.state.newProgramName}>Edit</Link>
    </div>
  }
}

export default Programs
