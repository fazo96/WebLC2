import 'style.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory, browserHistory, Link} from 'react-router'

import HTTP from 'components/HTTP.js'
import PagedMemoryViewer from 'components/PagedMemoryViewer.jsx'
import CPU from 'components/CPU.jsx'
import Binaries from 'components/Binaries.jsx'
import Programs from 'components/Programs.jsx'
import Editor from 'components/Editor.jsx'

import { LC2 } from 'lc2.js'

class Navbar extends React.Component {
  render () {
    return <navbar>
      <Link to="/" activeClassName="active">WebLC2</Link>
      <Link to="/cpu" activeClassName="active">CPU</Link>
      <Link to="/binaries" activeClassName="active">Binaries</Link>
      <Link to="/editor" activeClassName="active">Editor</Link>
      <Link to="/programs" activeClassName="active">Programs</Link>
    </navbar>
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
  componentWillMount () {
    this.setState({ lc2: new LC2() })
  }

  render () {
    return <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Homepage} />
        <Route path="/editor" component={Editor} />
        <Route path="/cpu" component={CPU} lc2={this.state.lc2} />
        <Route path="/binaries" component={Binaries} lc2={this.state.lc2} />
        <Route path="/programs" component={Programs} />
      </Route>
    </Router>
  }
}

let history
HTTP.get('/server', response => {
  if (response.data && response.code === 200) {
    console.log('WebLC2 server detected. Using BrowserHistory')
    history = browserHistory
  } else {
    history = hashHistory
  }
  ReactDOM.render(<AppRouter/>, document.getElementById('react-app'))
})
