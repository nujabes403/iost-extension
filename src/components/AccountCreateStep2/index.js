import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Input from 'components/Input'
import { Header, Toast } from 'components'
import Button from 'components/Button'

import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'

import './index.scss'

type Props = {

}

class AccountCreateStep2 extends Component<Props> {
  state = {
    errorMessage: '',
    ownerPublicKey: '',
    activePublicKey: '',
    ownerPrivateKey: '',
    activePrivateKey: '',

  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: '',
    })
  }

  throwErrorMessage = () => {
    this.setState({
      errorMessage: I18n.t('invalidLoginInfo'),
    })
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  replaceKeyPair = () => {
    console.log('replaceKeyPair')
  }

  onCopy = () => {
    Toast.html(I18n.t('ManageAccount_Copy'))
  }

  onCheckKey = () => {
    const isLegal = true
    // 密钥不合法
    if (!isLegal) {
      Toast.html(I18n.t('CreateAccount_ToastTip1'))
    } else {
      this.moveTo('/accountCreateStep3')()
    }
  }

  render() {
    const { ownerPublicKey, activePublicKey, activePrivateKey, ownerPrivateKey, errorMessage } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('firstLogin_CreateAccount')} onBack={this.moveTo('/accountCreateStep1')} hasSetting={false} />
        <div className="accountCreateStep2-box">
          <p className="title">{I18n.t('CreateAccount_ConfirmPrivate')}</p>
          <p className="rule">{I18n.t('CreateAccount_Tip2')}</p>

          <label className="label">{I18n.t('CreateAccount_OwnerPublicKey')}</label>
          <div className="key-box">
            <Input name="ownerPublicKey" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={ownerPublicKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>

          <label className="label">{I18n.t('CreateAccount_ActivePublicKey')}</label>
          <div className="key-box">
            <Input name="activePublicKey" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={activePublicKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>

          <label className="label">{I18n.t('CreateAccount_OwnerPrivateKey')}</label>
          <div className="key-box">
            <Input name="ownerPrivateKey" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={ownerPrivateKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>

          <label className="label">{I18n.t('CreateAccount_ActivePrivateKey')}</label>
          <div className="key-box">
            <Input name="activePrivateKey" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={activePrivateKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>
          <div className="btn-box">
            <Button className="btn-replaceKeyPair" onClick={this.replaceKeyPair}>{I18n.t('CreateAccount_ChangePrivateKey')}</Button>
            <Button onClick={this.onCheckKey}>{I18n.t('CreateAccount_NextStep')}</Button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AccountCreateStep2
