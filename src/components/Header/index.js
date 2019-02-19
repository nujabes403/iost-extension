import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'
import { Link } from 'react-router'
import classnames from 'classnames'
import './index.scss'

class Header extends Component<Props> {
  state = {}

  componentDidMount() {}

  render() {
    const { onClick, title, setting = true } = this.props
    return (
      <div className="header-box">
        <i className="icon-back" />
        <span className="title">{title}</span>
        {
          setting ? <i className="icon-setting" onClick={onClick} /> : <span className="add-account" onClick={onClick}>{I18n.t('addAccount')}</span>
        }
      </div>
    )
  }
}

export default Header
