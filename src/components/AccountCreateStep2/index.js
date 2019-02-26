import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Input from 'components/Input'
import { Header, Toast } from 'components'
import Button from 'components/Button'
import store from '../../store'
import * as userActions from 'actions/user'
import iost from 'iostJS/iost'
import './index.scss'

type Props = {

}

class AccountCreateStep2 extends Component<Props> {
  state = {
    ownerPublicKey: '',
    activePublicKey: '',
    ownerPrivateKey: '',
    activePrivateKey: '',
  }

  componentDidMount() {
    this.replaceKeyPair()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  replaceKeyPair = () => {
    const KeyPair = iost.pack.KeyPair
    const newKP = KeyPair.newKeyPair();
    this.setState({
      ownerPublicKey: newKP.B58PubKey(),
      activePublicKey: newKP.B58PubKey(),
      ownerPrivateKey: newKP.B58SecKey(),
      activePrivateKey: newKP.B58SecKey(),
    },() => {
      store.dispatch(userActions.createAccountInfo(this.state.ownerPublicKey))
    })
  }

  onCopy = () => {
    Toast.html(I18n.t('ManageAccount_Copy'))
  }

  render() {
    const { ownerPublicKey, activePublicKey, activePrivateKey, ownerPrivateKey } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('firstLogin_CreateAccount')} onBack={this.moveTo('/accountCreateStep1')} hasSetting={false} />
        <div className="accountCreateStep2-box">
          <p className="title">{I18n.t('CreateAccount_ConfirmPrivate')}</p>
          <p className="rule">{I18n.t('CreateAccount_Tip2')}</p>

          <label className="label">{I18n.t('CreateAccount_OwnerPublicKey')}</label>
          <div className="key-box">
            <Input name="ownerPublicKey" value={ownerPublicKey} readOnly={true} onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={ownerPublicKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>

          <label className="label">{I18n.t('CreateAccount_ActivePublicKey')}</label>
          <div className="key-box">
            <Input name="activePublicKey" value={activePublicKey} readOnly={true} onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={activePublicKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>

          <label className="label">{I18n.t('CreateAccount_OwnerPrivateKey')}</label>
          <div className="key-box">
            <Input name="ownerPrivateKey" value={ownerPrivateKey} readOnly={true} onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={ownerPrivateKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>

          <label className="label">{I18n.t('CreateAccount_ActivePrivateKey')}</label>
          <div className="key-box">
            <Input name="activePrivateKey" value={activePrivateKey} readOnly={true} onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={activePrivateKey}>
              <i className="copy" />
            </CopyToClipboard>
          </div>
          <div className="btn-box">
            <Button className="btn-replaceKeyPair" onClick={this.replaceKeyPair}>{I18n.t('CreateAccount_ChangePrivateKey')}</Button>
            <Button onClick={this.moveTo('/accountCreateStep3')}>{I18n.t('CreateAccount_NextStep')}</Button>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default AccountCreateStep2
