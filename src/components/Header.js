import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'

import NetworkSelector from 'components/NetworkSelector'

import './Header.scss'

class Header extends Component<Props> {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div className="Header">
        <div className="Header__logo" />
        <NetworkSelector
          className="Header__NetworkSelector"
        />
      </div>
    )
  }
}

export default Header
