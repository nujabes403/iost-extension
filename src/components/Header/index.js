import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'
import { Link } from 'react-router'
import classnames from 'classnames'
import './index.scss'

class Header extends Component<Props> {
  state = {}

  componentDidMount() {}

  render() {
    const { onBack, onSetting, onAddIost, title, setting = true, hasSetting = true, logo = false, children, hasAdd } = this.props
    return (
      <div className="header-box">
        <i className={logo ? hasAdd ? 'icon-add': 'icon-logo' : 'icon-back'} onClick={onBack} />
        { title && <span className="title">{title}</span> }
        {children}
        {
          hasSetting ? (setting ? <i className="icon-setting" onClick={onSetting} /> : 
          <span className="add-account" onClick={onAddIost}>
            <span>{I18n.t('ManageAccount_Add')}</span>
          </span>) : <i />
        }
      </div>
    )
  }
}

export default Header
