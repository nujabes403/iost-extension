import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'
import { Link } from 'react-router'
import classnames from 'classnames'
import './index.scss'

class Header extends Component<Props> {
  state = {}

  componentDidMount() {}

  render() {
    const { onBack, onSetting, onAdd, title, setting = true, hasSetting = true, logo = false, children } = this.props
    return (
      <div className="header-box">
        <i className={logo ? 'icon-logo' : 'icon-back'} onClick={onBack} />
        { title && <span className="title">{title}</span> }
        {children}
        {
          hasSetting ? (setting ? <i className="icon-setting" onClick={onSetting} /> : <span className="add-account" onClick={onAdd}>{I18n.t('ManageAccount_Add')}</span>) : <i />
        }
      </div>
    )
  }
}

export default Header
