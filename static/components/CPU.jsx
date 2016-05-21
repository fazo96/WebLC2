
import React from 'react'
import PagedMemoryViewer from 'components/PagedMemoryViewer.jsx'

class CPU extends React.Component {
  render () {
    let LC2 = require('lc2.js').LC2
    let lc2 = new LC2()
    return <div>
      <PagedMemoryViewer lc2={lc2} start={0} />
    </div>
  }
}

export default CPU
