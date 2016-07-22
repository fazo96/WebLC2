import React from 'react'
import ContentEditable from './ContentEditable.jsx'
import DataManager from './DataManager.js'

class Editor extends React.Component {

  sanitize (code) {
    return code
      .split(/(<\/?(br|div|span)>)+/)
      .filter(x => !/(<?\/?(br|div|span)>?)+/.test(x))
      .join('\n')
      .split(/((&nbsp;)|(&emsp;))+/)
      .filter(x => !/((&nbsp;)|(&emsp;))+/.test(x))
      .join(' ')
  }

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

  componentWillUnmount () {
    if (this.props.name) {
      this.save()
    }
  }

  componentWillReceiveProps (props) {
    if (props.name) this.load(props.name)
  }

  codeEdited (event) {
    this.setState({ code: event.target.value }, () => {
      this.save()
      if (typeof this.props.save === 'function') {
        this.props.onSave({
          code: this.state.code,
          binary: this.state.binary
        })
      }
    })
  }

  save () {
    let code = this.sanitize(this.state.code)
    let program = DataManager.load('programs')[this.state.name]
    let binary = program ? program.binary : undefined
    if (this.assembleAvailable()) {
      let assembler = this.state.assembler
      let assembled = assembler.assemble(this.sanitize(this.state.code))
      let compiled = assembler.toBinary(assembled)
      console.log('Compiled:', compiled)
      binary = DataManager.convertBinaryToArray(compiled)
    }
    console.log('Saving:', code, binary)
    DataManager.set('programs', this.state.name, { code, binary })
    this.setState({ binary })
  }

  assembleAvailable () {
    return this.state.assembler && this.state.name && this.state.name.length > 0
  }

  render () {
    return <div style={this.props.style}>
      <b>{this.state.name}</b>
      <ContentEditable className="editor" onChange={this.codeEdited.bind(this)} html={this.state.code}/>
      <button onClick={this.save.bind(this)}>
        Save
      </button>
    </div>
  }
}

export default Editor
