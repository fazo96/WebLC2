import React from 'react'
import Link from 'react-router/lib/Link'

class Navbar extends React.Component {
  render () {
    return <navbar>
      {this.props.links.map(item => {
        return <Link key={item.url} to={item.url} activeClassName="active">
          {item.name || item.url}
        </Link>
      })}
    </navbar>
  }
}

export default Navbar
