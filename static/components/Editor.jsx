import React from 'react'
import ContentEditable from './ContentEditable.jsx'
import DataManager from './DataManager.js'

class Editor extends React.Component {

  sanitize (code) {
    return code
      .split(/(<\/?(br|div)>)+/)
      .filter(x => !/(<?\/?(br|div)>?)+/.test(x))
      .join('\n')
  }

  componentWillMount () {
    let Assembler = require('lc2.js').Assembler
    let assembler = new Assembler(true)
    let code = DataManager.load('editor') || ''
    let name = DataManager.load('editor-program-name') || ''
    this.setState({ code, name, assembler })
  }

  backupCode (event) {
    DataManager.save('editor', event.target.value)
    this.setState({ code: event.target.value })
  }

  assemble () {
    if (this.assembleAvailable()) {
      let assembler = this.state.assembler
      let assembled = assembler.assemble(this.sanitize(this.state.code))
      let compiled = assembler.toBinary(assembled)
      console.log('Compiled:', compiled)
      let toSave = Array(compiled)
      console.log('Saving:', toSave)
      DataManager.set('binaries', this.state.name, toSave)
    }
  }

  assembleAvailable () {
    return this.state.assembler && this.state.name && this.state.name.length > 0
  }

  nameChanged (event) {
    this.setState({ name: event.target.value })
    DataManager.save('editor-program-name', event.target.value)
  }

  render () {
    return <div>
      <input type="text" placeholder="Program name" onChange={this.nameChanged.bind(this)} value={this.state.name}/>
      <ContentEditable className="editor" onChange={this.backupCode.bind(this)} html={this.state.code}/>
      <button onClick={this.assemble.bind(this)} disabled={!this.assembleAvailable.apply(this)}>
        Assemble
      </button>
    </div>
  }
}

export default Editor
