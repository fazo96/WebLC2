import React from 'react'
import WordViewer from './WordViewer.jsx'

class MemoryCellViewer extends React.Component {

  getValue () {
    return this.props.lc2.mem(this.props.address)
  }

  render () {
    return <div className="memory-cell">
      <div>
        <b>Address</b> <WordViewer format="hex">{this.props.address}</WordViewer>
      </div>
      <div>
        <b>Value</b> <WordViewer format="hex">{this.getValue()}</WordViewer>
      </div>
    </div>
  }
}

export default MemoryCellViewer