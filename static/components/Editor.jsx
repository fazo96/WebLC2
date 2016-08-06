import React from 'react'
import ContentEditable from './ContentEditable.jsx'
import DataManager from './DataManager.js'

class Editor extends React.Component {

  load (name) {
    let programs = DataManager.load('programs') || {}
    let code = ''
    if (programs[name] && programs[name].code) {
      code = programs[name].code.split('\n').join('<br>')
    }
    this.setState({ code, name })
  }

  componentWillMount () {
    if (this.props.name) {
      this.load(this.props.name)
    }
    let Assembler = require('lc2.js').Assembler
    let assembler = new Assembler()
    this.setState({ assembler })
  }

  triggerOnSave (code) {
    console.log(this.props.onSave, typeof this.props.onSave)
    if (typeof this.props.onSave === 'function') {
      this.props.onSave(code)
    }
  }

  codeEdited (event) {
    this.setState({ code: event.target.value }, () => {
      this.triggerOnSave(this.state.code)
    })
  }

  render () {
    return <div style={this.props.style}>
      <b>{this.state.name}</b>
      <ContentEditable className="editor" onChange={this.codeEdited.bind(this)} html={this.state.code}/>
    </div>
  }
}

export default Editor
