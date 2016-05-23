import 'style.css'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, IndexRoute, hashHistory, browserHistory, Link} from 'react-router'

import HTTP from 'components/HTTP.js'
import PagedMemoryViewer from 'components/PagedMemoryViewer.jsx'
import CPU from 'components/CPU.jsx'
import Editor from 'components/Editor.jsx'

class Navbar extends React.Component {
  render () {
    return <navbar>
      <Link to="/" activeClassName="active">WebLC2</Link>
      <Link to="/cpu" activeClassName="active">CPU</Link>
      <Link to="/editor" activeClassName="active">Editor</Link>
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
  render () {
    return <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Homepage} />
        <Route path="/editor" component={Editor} />
        <Route path="/cpu" component={CPU} />
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
