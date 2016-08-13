import React from 'react'
import ReactDOM from 'react-dom'
import ContentEditable from './ContentEditable.jsx'
import DataManager from './DataManager.js'
import CodeMirror from 'codemirror'
import LC2Mode from '../lib/lc2CodemirrorMode.js'
// require('../../node_modules/codemirror/lib/codemirror.css')
require('../../node_modules/codemirror/addon/mode/simple.js')

CodeMirror.defineSimpleMode('lc2', LC2Mode)

class Editor extends React.Component {

  load (name, done) {
    let programs = DataManager.load('programs') || {}
    let code = ''
    if (programs[name] && programs[name].code) {
      code = programs[name].code
    }
    this.setState({ code, name }, () => {
      if (this.state.editor) {
        this.state.editor.setValue(this.state.code)
        this.state.editor.refresh()
        this.codeEdited(this.state.editor)
      }
      if (typeof done === 'function') done()
    })
  }

  componentDidMount () {
    let component = ReactDOM.findDOMNode(this)
    let textarea = component.getElementsByTagName('textarea')[0]
    let editor = CodeMirror.fromTextArea(textarea, {
      mode: 'lc2',
      indentWithTabs: true,
      lineNumbers: true,
      autofocus: true
    })
    editor.on('change', this.codeEdited.bind(this))
    setTimeout(() => {
      if (this.props.name) {
        this.load(this.props.name, () => {
          if (typeof this.props.onReady === 'function') this.props.onReady()
        })
      }
    }, 500) // workaround
    this.setState({ editor })
  }

  triggerOnSave (code) {
    if (typeof this.props.onSave === 'function') {
      this.props.onSave(code)
    }
  }

  codeEdited (editor) {
    console.log('change', editor.getValue())
    this.setState({ code: editor.getValue() }, () => {
      this.triggerOnSave(this.state.code)
    })
  }

  render () {
    return <div style={this.props.style}>
      <b>{this.props.name}</b>
      <textarea/>
    </div>
  }
}

export default Editor
