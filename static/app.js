import 'style.css'

import React from 'react'
import ReactDOM from 'react-dom'

class Navbar extends React.Component {
  render () {
    return <navbar>
      <section class="title">
        WebLC2
      </section>
      <button>Emulator</button>
      <button>Editor</button>
    </navbar>
  }
}

class Editor extends React.Component {
  render () {
    return <section class="element editor active">
      <div class="editor-body" contenteditable></div>
    </section>
  }
}

class Homepage extends React.Component {
  render () {
    return <div>
      <Navbar /><Editor />
    </div>
  }
}

ReactDOM.render(<Homepage/>, document.getElementById('react-app'))
