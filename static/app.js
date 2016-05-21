import 'style.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory, Link} from 'react-router'

import PagedMemoryViewer from 'components/PagedMemoryViewer.jsx'

class Navbar extends React.Component {
  render () {
    return <navbar>
      <Link to="/" activeClassName="active">WebLC2</Link>
      <Link to="/cpu" activeClassName="active">CPU</Link>
      <Link to="/editor" activeClassName="active">Editor</Link>
    </navbar>
  }
}

class Editor extends React.Component {
  render () {
    return <section className="element editor active">
      <div className="editor-body" contenteditable>
        {this.props.children}
      </div>
    </section>
  }
}

class CPU extends React.Component {
  render () {
    let LC2 = require('lc2.js').LC2
    let lc2 = new LC2()
    return <div>
      <PagedMemoryViewer lc2={lc2} start={0} />
    </div>
  }
}

class Homepage extends React.Component {
  render () {
    return <h1>Hello World</h1>
  }
}

class App extends React.Component {
  render () {
    return <div>
      <Navbar />
      <div className="container">
        {this.props.children}
      </div>
    </div>
  }
}

class AppRouter extends React.Component {
  render () {
    return <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Homepage} />
        <Route path="/editor" component={Editor} />
        <Route path="/cpu" component={CPU} />
      </Route>
    </Router>
  }
}

ReactDOM.render(<AppRouter/>, document.getElementById('react-app'))
