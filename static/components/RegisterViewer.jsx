import React from 'react'
import WordViewer from './WordViewer.jsx'

class RegisterViewer extends React.Component {
  render () {
    let lc2 = this.props.lc2
    let gpr = []
    /* Convert GPRs to regular array
    Necessary because array.map doesn't play well with UInt16Array
    */
    for (let i = 0; i < 7; i++) {
      gpr.push(lc2.gpr[i])
    }
    return <div className="register-viewer">
      <table>
        <thead>
          <tr><td>Register</td><td>Value</td></tr>
        </thead>
        <tbody>
        <tr><td>PC</td><td><WordViewer>{lc2.pc}</WordViewer></td></tr>
        <tr><td>CC</td><td><WordViewer>{lc2.cc}</WordViewer></td></tr>
        <tr><td>ON</td><td>{lc2.isOn() ? 'Yes' : 'No'}</td></tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr><td>GPR</td><td>Value</td></tr>
        </thead>
        <tbody>
        {gpr.map((val, i) => <tr key={i}><td>R{i}</td><td><WordViewer>
          {lc2.gpr[i]}
        </WordViewer></td></tr>)}
        </tbody>
      </table>
    </div>
  }
}

export default RegisterViewer
