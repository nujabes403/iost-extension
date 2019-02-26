import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Input from 'components/Input'
import { Header, Toast } from 'components'
import Button from 'components/Button'
import NetworkSelector from 'components/NetworkSelector'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'

import './index.scss'

type Props = {

}

class AccountCreateStep3 extends Component<Props> {
  state = {
    paymentCurrency: '',
    paymentAddress: '',
    memo: '',
    errorMessage: '',
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

  onCopy = () => {
    Toast.html(I18n.t('ManageAccount_Copy'))
  }

  onCheckCreate = () => {
    const isLegal = true
    // 验证失败
    if (!isLegal) {
      Toast.html(I18n.t('CreateAccount_ToastTip2'))
    } else {
      this.moveTo('/accountManage')()
    }
  }

  render() {
    const { paymentCurrency, paymentAddress, memo, errorMessage } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('firstLogin_CreateAccount')} onBack={this.moveTo('/accountCreateStep2')} hasSetting={false} />
        <div className="accountCreate-box">
          <p className="title">{I18n.t('CreateAccount_Pay')}</p>
          <p className="rule">{I18n.t('CreateAccount_Tip3')}</p>
          <p className="rule">{I18n.t('CreateAccount_Tip4')}</p>
          <label className="label">{I18n.t('CreateAccount_PaymentCurrency')}</label>
          <div className="key-box">
            <Input name="paymentCurrency" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={paymentCurrency}>
              <i className="copy" />
            </CopyToClipboard>
          </div>
          <label className="label">{I18n.t('CreateAccount_PaymentAddress')}</label>
          <div className="key-box">
            <Input name="paymentAddress" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={paymentAddress}>
              <i className="copy" />
            </CopyToClipboard>
          </div>
          <label className="label">Memo</label>
          <div className="key-box">
            <Input name="memo" onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={memo}>
              <i className="copy" />
            </CopyToClipboard>
          </div>
          <Button className="btn-checkCreate" onClick={this.onCheckCreate}>{I18n.t('CreateAccount_CheckCreate')}</Button>
        </div>
      </Fragment>
    )
  }
}

export default AccountCreateStep3
