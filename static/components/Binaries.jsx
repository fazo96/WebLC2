import React from 'react'
import DataManager from './DataManager.js'
import Link from 'react-router/lib/Link'

class BinaryViewer extends React.Component {

  load () {
    this.props.lc2.loadProgram(this.props.value)
  }

  render () {
    let size = this.props.value.length * 2 // bytes
    return <div>
      <b>{this.props.name}</b> ({size} bytes)
      <button onClick={this.load.bind(this)}>Load</button>
      <Link to={'/editor/' + this.props.name} className="button">Edit</Link>
      {this.props.onDelete
        ? <button onClick={() => this.props.onDelete(this.props.name)}>Delete</button>
        : '' }
    </div>
  }
}

class Binaries extends React.Component {
  componentWillMount () {
    this.setState({ binaries: DataManager.load('binaries') || {} })
  }

  delete (name) {
    let binaries = this.state.binaries
    if (binaries[name] !== undefined) {
      delete binaries[name]
      DataManager.save('binaries', binaries)
      this.setState({ binaries })
    }
  }

  render () {
    return <div>
      {Object.keys(this.state.binaries).map(name => {
        let value = this.state.binaries[name]
        return <BinaryViewer key={name} name={name} value={value} onDelete={this.delete.bind(this)} lc2={this.props.route.lc2}/>
      })}
    </div>
  }
}

export default Binaries
