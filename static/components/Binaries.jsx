import React from 'react'
import DataManager from './DataManager.js'

class BinaryViewer extends React.Component {
  render () {
    let size = this.props.value.length * 2 // bytes
    return <div>
      <b>{this.props.name}</b> ({size} bytes)
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
        return <BinaryViewer name={name} value={value} />
      })}
    </div>
  }
}

export default Binaries
