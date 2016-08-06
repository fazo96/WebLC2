import React from 'react'
import MemoryCellViewer from './MemoryCellViewer.jsx'
import DataManager from './DataManager.js'

class MemoryViewer extends React.Component {
  render () {
    let addresses = []
    let end = this.props.start + this.props.amount
    for (let i = this.props.start; i < end; i++) addresses.push(i)
    return <div className="memory">
      {addresses.map(address =>
        <MemoryCellViewer lc2={this.props.lc2} formats={['hex', 'bin']} address={address} key={address} />
      )}
    </div>
  }
}

class PagedMemoryViewer extends React.Component {

  componentWillMount () {
    let start = this.props.start
    this.setState({ start: parseInt(start) })
  }

  ensureBounds (val) {
    let total = Math.pow(2, 16)
    val = parseInt(val)
    if (val < 0) val = 0
    if (val >= total - this.props.perPage) val = total - this.props.perPage
    return val
  }

  move (offset) {
    let start = this.ensureBounds(this.state.start + (this.props.perPage || 20) * offset)
    this.setState({ start })
  }

  next () {
    this.move(1)
  }

  previous () {
    this.move(-1)
  }

  goto () {
    let start = this.ensureBounds(parseInt(this.state.targetAddr || 0, 16) - parseInt(this.props.perPage / 2))
    DataManager.save('memory-viewer-location', start)
    this.setState({ start })
  }

  targetAddrChanged (event) {
    this.setState({ targetAddr: event.target.value })
  }

  locationToHex (loc) {
    return loc.toString(16)
  }

  render () {
    let start = this.state.start
    let total = Math.pow(2, 16)
    return <div className="paged-memory-viewer">
      <div className="search">
        <input type="text" placeholder="Address (hex)" onChange={this.targetAddrChanged.bind(this)} />
        <button onClick={this.goto.bind(this)}>Go</button>
      </div>
      <MemoryViewer lc2={this.props.lc2} start={start} amount={this.props.perPage} />
      <div className="buttons">
        <button onClick={this.previous.bind(this)}>Previous</button>
        <button onClick={this.next.bind(this)}>Next</button>
      </div>
    </div>
  }
}

export default PagedMemoryViewer
