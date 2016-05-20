import React from 'react'

class WordViewer extends React.Component {

  pad (value, length) {
    while (value.length < length) value = '0' + value
    return value
  }

  convert (value, format) {
    if (typeof value === 'string') value = parseInt(value, 10)
    switch (format) {
      case 'hex': return 'x' + this.pad(value.toString(16), 4)
      case 'bin': return 'b' + this.pad(value.toString(2), 16)
      case 'dec': return 'b' + this.pad(value.toString(10), 16)
    }
  }

  render () {
    return <span className="word">
      {this.convert(this.props.children || 0, this.props.format || 'hex')}
    </span>
  }
}

export default WordViewer
