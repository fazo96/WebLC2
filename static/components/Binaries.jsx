import React from 'react'
import DataManager from './DataManager.js'

class BinaryViewer extends React.Component {
  load () {
    this.props.lc2.loadProgram(this.props.value)
  }

  render () {
    let size = this.props.value.length * 2 // bytes
    return <div>
      <b>{this.props.name}</b> ({size} bytes)
      <button onClick={this.load.bind(this)}>Load</button>
    </div>
  }
}

class Binaries extends React.Component {
  componentWillMount () {
    this.setState({ binaries: DataManager.load('binaries') || {} })
  }

  render () {
    return <div>
      {Object.keys(this.state.binaries).map(name => {
        let value = this.state.binaries[name]
        return <BinaryViewer key={name} name={name} value={value} lc2={this.props.route.lc2}/>
      })}
    </div>
  }
}

export default Binaries
