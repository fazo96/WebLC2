import React from 'react'
import ContentEditable from './ContentEditable.jsx'

class Editor extends React.Component {

  componentWillMount () {
    let code = ''
    let saveEnabled = false
    if (window && window.localStorage) {
      saveEnabled = true
      code = window.localStorage.getItem('editor')
      console.log(code)
    }
    this.setState({ code, saveEnabled })
  }

  backupCode (event) {
    if (this.state.saveEnabled) {
      window.localStorage.setItem('editor', event.target.value)
    }
    this.setState({ code: event.target.value })
  }

  assembleAndLoad () {
    console.log('assembleandload')
  }

  render () {
    return <div>
      <ContentEditable className="editor" onChange={this.backupCode.bind(this)} html={this.state.code}/>
      <button onClick={this.assembleAndLoad.bind(this)}>Assemble and Load</button>
    </div>
  }
}

export default Editor
