import React from 'react'
import CPU from './CPU.jsx'
import Programs from './Programs.jsx'
import Editor from './Editor.jsx'

class Homepage extends React.Component {
  render () {
    return <div
      style={this.props.style}
      dangerouslySetInnerHTML={{ __html: require('../pages/homepage.md') }}
    />
  }
}

class Tab extends React.Component {

  componentWillMount () {
    this.setState({
      name: this.props.name || 'Unnamed Tab'
    })
  }

  closeTab (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.closeTab(this.props.i)
  }

  selectTab (e) {
    e.preventDefault()
    e.stopPropagation()
    this.props.selectTab(this.props.i)
  }

  getCloseButton () {
    if (this.props.closeable) {
      return <button onClick={this.closeTab.bind(this)}>x</button>
    } else return ''
  }

  nameChanged (e) {
    this.setState({
      name: e.target.value
    })
  }

  startRenaming () {
    if (this.props.renameable && this.props.activeTab) {
      this.setState({ renaming: true })
    }
  }

  stopRenaming () {
    this.setState({ renaming: false }, () => {
      if (typeof this.props.onNameChanged === 'function') {
        this.props.onNameChanged(this.state.name, this.props.i)
      }
    })
  }

  inputKeyUp (e) {
    console.log(e.charCode)
    if (e.charCode === 13) {
      this.stopRenaming()
    }
  }

  getNameComponent () {
    if (this.state.renaming) {
      return <input type="text"
        value={this.state.name}
        onChange={this.nameChanged.bind(this)}
        onKeyPress={this.inputKeyUp.bind(this)}
      />
    } else {
      let active = this.props.activeTab
      let style = {
        'textDecoration': active ? 'underline' : 'none'
      }
      return <span onClick={this.startRenaming.bind(this)} style={style}>
        {this.state.name}
      </span>
    }
  }

  render () {
    let activeTab = this.props.activeTab
    let i = this.props.i
    return <a onClick={this.selectTab.bind(this)} className={i === activeTab ? 'active tab' : 'tab'}>
      {this.getNameComponent.apply(this)}
      {this.getCloseButton.apply(this)}
    </a>
  }
}

class TabView extends React.Component {

  getDefaultState () {
    return {
      tabs: [
        {
          name: <b>WebLC2</b>,
          view: Homepage,
          closeable: false,
          renameable: false
        },
        {
          name: 'Programs',
          view: Programs,
          closeable: false,
          renameable: false
        }
      ],
      active: 0
    }
  }

  componentWillMount () {
    let state = this.props.tabs || this.getDefaultState()
    this.setState(state)
  }

  selectTab (i) {
    this.setState({ active: i })
  }

  closeTab (i) {
    let tabs = this.state.tabs
    tabs.splice(i, 1)
    let active
    if (this.state.active === i) {
      active = 0
    } else {
      active = i
    }
    this.setState({ tabs, active })
  }

  onTabNameChanged (tabName, tabIndex) {
    let tabs = this.state.tabs
    tabs[tabIndex].name = tabName
    this.setState({ tabs })
  }

  buildTab (tab, i) {
    return <Tab
      name={tab.name || 'Unnamed Tab'} key={i} i={i} closeable={!!tab.closeable}
      renameable={!!tab.renameable}
      activeTab={i === this.state.active}
      selectTab={this.selectTab.bind(this)} closeTab={this.closeTab.bind(this)}
      onNameChanged={this.onTabNameChanged.bind(this)}
    />
  }

  getTabContent (tab, i) {
    let Component = tab.view
    let hidden = i !== this.state.active
    let component = <Component
      key={i} name={tab.name}
      createNewTab={this.createNewTab.bind(this)}
      style={hidden ? { display: 'none' } : {}}
    />
    return component
  }

  createNewTab (name, view, closeable = true, renameable = true) {
    this.setState({
      tabs: this.state.tabs.concat({ name, view, closeable, renameable })
    }, () => {
      let newTabIndex = this.state.tabs.length - 1
      this.selectTab(newTabIndex)
    })
  }

  createDefaultNewTab () {
    return this.createNewTab('New Tab', CPU)
  }

  isTabActive (tab, i) {
    return i === this.state.active
  }
  /*
  { this.state.tabs
    .filter(this.isTabActive.bind(this))
    .map(this.getTabContent.bind(this))
  }*/

  render () {
    return <div>
      <navbar>
        {this.state.tabs.map(this.buildTab.bind(this))}
        <button onClick={this.createDefaultNewTab.bind(this)}>+</button>
      </navbar>
      <div className="container">
        { this.state.tabs.map(this.getTabContent.bind(this)) }
      </div>
    </div>
  }
}

export default TabView
