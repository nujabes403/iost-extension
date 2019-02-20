import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Input from 'components/Input'
import { Header } from 'components'
import Button from 'components/Button'

import NetworkSelector from 'components/NetworkSelector'
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
    console.log('复制成功')
  }

  render() {
    const { ownerPublicKey, activePublicKey, activePrivateKey, errorMessage } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('accountCreate')} onBack={this.moveTo('/accountCreateStep1')} hasSetting={false} />
        <div className="accountCreateStep2-box">
          <p className="title">{I18n.t('ConfirmKeyPair')}</p>
          <p className="rule">{I18n.t('ConfirmAccount')}</p>

          <label className="label">{I18n.t('OwnerPublicKey')}</label>
          <div className="key-box">
            <Input name="ownerPublicKey" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={ownerPublicKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>

          <label className="label">{I18n.t('ActivePublicKey')}</label>
          <div className="key-box">
            <Input name="activePublicKey" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={activePublicKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>

          <label className="label">{I18n.t('ActivePrivateKey')}</label>
          <div className="key-box">
            <Input name="activePrivateKey" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={activePrivateKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>
          <div className="btn-box">
            <Button className="btn-replaceKeyPair" onClick={this.replaceKeyPair}>{I18n.t('replaceKeyPair')}</Button>
            <Button onClick={this.moveTo('/accountCreateStep3')}>{I18n.t('nextStep')}</Button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AccountCreateStep2
