import React from 'react'
import DataManager from './DataManager.js'
import Link from 'react-router/lib/Link'

class Program extends React.Component {
  render () {
    let lines = this.props.value.split('\n').length
    return <div className="program">
      <b>{this.props.name}</b> ({lines} lines)
      <Link className="button" to={'/editor/' + this.props.name}>Edit</Link>
    </div>
  }
}

class Programs extends React.Component {

  componentWillMount () {
    let programs = DataManager.load('programs') || {}
    this.setState({ programs })
  }

  render () {
    return <div className="programs">
      {Object.keys(this.state.programs).map(program =>
        <Program key={program} name={program} value={this.state.programs[program]} />
      )}
    </div>
  }
}

export default Programs
