import React from 'react'
import WordViewer from './WordViewer.jsx'

class MemoryCellViewer extends React.Component {

  getValue () {
    return this.props.lc2.mem(this.props.address)
  }

  render () {
    return <div className="memory-cell">
      <div className="memory-address">
        <b><WordViewer format={this.props.format}>{this.props.address}</WordViewer></b>
      </div>
      <div className="memory-value">
        <WordViewer format={this.props.format}>{this.getValue()}</WordViewer>
      </div>
    </div>
  }
}

export default MemoryCellViewer
