import React from 'react'
import MemoryCellViewer from './MemoryCellViewer.jsx'

class MemoryViewer extends React.Component {
  render () {
    let addresses = []
    let end = this.props.start + this.props.amount
    for (let i = this.props.start; i < end; i++) addresses.push(i)
    return <div className="memory">
      {addresses.map(address =>
        <MemoryCellViewer lc2={this.props.lc2} format="hex" address={address} key={address} />
      )}
    </div>
  }
}

class PagedMemoryViewer extends React.Component {

  componentWillMount () {
    this.setState({ start: this.props.start })
  }

  move (offset) {
    this.setState({
      start: this.state.start + (this.props.perPage || 20) * offset
    })
  }

  next () {
    this.move(1)
  }

  previous () {
    this.move(-1)
  }

  goto () {
    let start = parseInt(this.state.targetAddr || 0, 16) - parseInt((this.props.perPage || 21) / 2)
    if (start < 0) start = 0
    if (start > Math.pow(2, 16)) start = Math.pow(2, 16) - 1 - this.props.perPage
    this.setState({ start })
  }

  targetAddrChanged (event) {
    this.setState({ targetAddr: event.target.value })
  }

  render () {
    let start = this.state.start
    let total = Math.pow(2, 16)
    let perPage = this.props.perPage || 20
    let viewer = <MemoryViewer lc2={this.props.lc2} start={start} amount={perPage} />
    return <div className="paged-memory-viewer">
      <div className="search">
        <input type="text" placeholder="Address (hex)" onChange={this.targetAddrChanged.bind(this)} />
        <button onClick={this.goto.bind(this)}>Go</button>
      </div>
      {viewer}
      <div className="buttons">
        <button onClick={this.previous.bind(this)}>Previous</button>
        <button onClick={this.next.bind(this)}>Next</button>
      </div>
    </div>
  }
}

export default PagedMemoryViewer
