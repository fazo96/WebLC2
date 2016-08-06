import React from 'react'
import WordViewer from './WordViewer.jsx'

class MemoryCellViewer extends React.Component {

  getValue () {
    return this.props.lc2.mem(this.props.address)
  }

  render () {
    let formats = this.props.format ? [ this.props.format ] : this.props.formats
    return <div className="memory-cell">
      <div className="memory-address">
        <b><WordViewer format="hex">{this.props.address}</WordViewer></b>
      </div>
      {formats.map((format, key) => {
        return <div className="memory-value" key={key} >
          <WordViewer format={format}>{this.getValue()}</WordViewer>
        </div>
      })}
    </div>
  }
}

export default MemoryCellViewer
