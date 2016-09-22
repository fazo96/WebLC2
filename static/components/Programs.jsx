import React from 'react'
import DataManager from './DataManager.js'
import CPU from 'components/CPU.jsx'
import HTTP from 'components/HTTP.js'

class Program extends React.Component {

  delete (name) {
    this.props.onDelete(name)
  }

  render () {
    let lines = this.props.program.code ? this.props.program.code.split('\n').length : '?'
    let size = this.props.program.binary ? this.props.program.binary.length * 2 : '?'
    let name = this.props.program.name || this.props.name || 'Unnamed'
    return <div className="program" style={this.props.style}>
      <div className="title">
        <b>{name}</b> ({lines} lines) ({size} bytes)
      </div>
      <div className="buttons">
        {this.props.allowUpload ? <button onClick={() => this.props.upload(name, this.props.program)}>Upload</button> : <span/>}
        {this.props.open ? <button onClick={() => this.props.open(name)}>Open</button> : <span/>}
        {this.props.onDelete ? <button onClick={() => this.delete(name)}>Delete</button> : <span/>}
        {this.props.upload ? <button onClick={() => this.props.upload(name, this.props.program)}>Upload</button> : <span/>}
        {this.props.download ? <button onClick={() => this.props.download(this.props.program)}>Copy Locally</button> : <span/>}
      </div>
    </div>
  }
}

class ProgramsView extends React.Component {

  render () {
    let programs = this.props.programs
    return <div className="programs" style={this.props.style}>
      {Object.keys(programs).map(program =>
        <Program key={program} name={program}
          program={programs[program]}
          onDelete={this.props.delete ? this.props.delete.bind(this) : undefined}
          open={this.props.newProgram}
          upload={this.props.allowUpload ? this.props.upload : undefined}
          download={this.props.download}
        />
      )}
    </div>
  }
}

class LocalPrograms extends React.Component {

  componentWillMount () {
    this.setState({
      programs: DataManager.load('programs') || {},
      newProgramName: '',
      allowUpload: false
    }, () => {
      this.checkServer()
    })
  }

  newProgramNameChanged (event) {
    this.setState({ newProgramName: event.target.value })
  }

  newProgram (name) {
    if (typeof name !== 'string') {
      this.props.createNewTab(this.state.newProgramName, CPU)
      this.setState({ newProgramName: '' })
    } else {
      this.props.createNewTab(name, CPU)
    }
  }

  delete (name) {
    let programs = this.state.programs
    if (programs[name] !== undefined) {
      delete programs[name]
      DataManager.save('programs', programs)
      this.refresh()
    }
  }

  checkServer () {
    HTTP.get('/programs', response => {
      let allowUpload = response.code === 200
      this.setState({ allowUpload })
    })
  }

  upload (name, program) {
    program.name = name
    console.log('POST', program)
    HTTP.post('/program', program, response => {
      console.log(response)
    })
  }

  refresh () {
    this.setState({
      programs: DataManager.load('programs') || {}
    })
  }

  render () {
    let programs = DataManager.load('programs') || {}
    return <div>
      <h2>Local Programs</h2>
      <ProgramsView
        style={this.props.style}
        programs={programs}
        delete={this.delete.bind(this)}
        newProgram={this.newProgram.bind(this)}
        allowUpload={this.state.allowUpload}
        upload={this.upload.bind(this)}
      />
      <button onClick={this.refresh.bind(this)}>Refresh</button>
      <div className="new-program-form">
        <input type="text" placeholder="Create new program..." onChange={this.newProgramNameChanged.bind(this)} value={this.state.newProgramName}/>
        <button onClick={this.newProgram.bind(this)} disabled={!this.state.newProgramName}>Edit</button>
      </div>
    </div>
  }
}

class RemotePrograms extends React.Component {

  refresh () {
    HTTP.get('/programs', response => {
      if (response.code === 200) {
        this.setState({ programs: response.data })
      } else if (response.code === 404) {
        this.setState({ error: 'Server not available.' })
      } else {
        this.setState({ error: 'An error has occured.' })
        console.log(response)
      }
    })
  }

  componentWillMount () {
    this.setState({})
    this.refresh()
  }

  download (program) {
    let programs = DataManager.load('programs') || {}
    programs[program.name] = program
    DataManager.save('programs', programs)
  }

  render () {
    if (this.state.programs) {
      let programs = this.state.programs
      return <div>
        <h2>Online Programs</h2>
        <ProgramsView
          style={this.props.style}
          programs={programs}
          delete={this.delete}
          download={this.download}
        />
        <button onClick={this.refresh.bind(this)}>Refresh</button>
      </div>
    } else if (this.state.error) {
      return <div>
        <h2>Online Programs</h2>
        {this.state.error}
      </div>
    } else {
      return <div>
        <h2>Online Programs</h2>
        Loading...
      </div>
    }
  }
}

class Programs extends React.Component {

  render () {
    return <div style={this.props.style}>
      <RemotePrograms/>
      <LocalPrograms
        createNewTab={this.props.createNewTab}
      />
    </div>
  }
}

export default Programs
