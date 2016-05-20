import React from 'react'
import MemoryCellViewer from './MemoryCellViewer.jsx'

class MemoryViewer extends React.Component {
  render () {
    let addresses = []
    for (let i = this.props.start; i < this.props.amount; i++) addresses.push[i]
    return <div class="memory">
      {addresses.map(address =>
        <MemoryCellViewer lc2={this.props.lc2} format="hex" address={address} />
      )}
    </div>
  }
}

export default MemoryViewer
