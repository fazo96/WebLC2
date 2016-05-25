import React from 'react'
import PagedMemoryViewer from 'components/PagedMemoryViewer.jsx'

class CPU extends React.Component {
  render () {
    let lc2 = this.props.route.lc2
    return <div>
      <PagedMemoryViewer lc2={lc2} start={0} perPage={20} />
    </div>
  }
}

export default CPU
