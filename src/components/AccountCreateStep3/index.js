import React, { Component, Fragment } from 'react'
import {connect} from "react-redux";
import { I18n } from 'react-redux-i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Input from 'components/Input'
import { Header, Toast } from 'components'
import Button from 'components/Button'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'

import './index.scss'
import * as userActions from "actions/user";
import store from "../../store";

type Props = {

}

class AccountCreateStep3 extends Component<Props> {
  state = {
    paymentCurrency: '100 IOST',
    paymentAddress: 'exchange.iost',
    memo: '',
  }

  componentDidMount() {
    const { createAccountInfo } = this.props
    this.setState({
      memo: `create:${createAccountInfo[0]}:${createAccountInfo[1]}:${createAccountInfo[1]}`
    })
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

  onCopy = () => {
    Toast.html(I18n.t('ManageAccount_Copy'))
  }

  onCheckCreate = async () => {
    const { createAccountInfo } = this.props
    try {
      // 如果没有找到账户信息，就会报错
      await iost.rpc.blockchain.getAccountInfo(createAccountInfo[0])
      Toast.html(I18n.t('CreateAccount_ToastTip3'))
      this.moveTo('/accountManage')()
    } catch (err) {
      Toast.html(I18n.t('CreateAccount_ToastTip2'))
    }
  }

  render() {
    const { paymentCurrency, paymentAddress, memo } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('firstLogin_CreateAccount')} onBack={this.moveTo('/accountCreateStep2')} hasSetting={false} />
        <div className="accountCreate-box">
          <p className="title">{I18n.t('CreateAccount_Pay')}</p>
          <p className="rule">{I18n.t('CreateAccount_Tip3')}</p>
          <p className="rule">{I18n.t('CreateAccount_Tip4')}</p>
          <label className="label">{I18n.t('CreateAccount_PaymentCurrency')}</label>
          <div className="key-box">
            <Input name="paymentCurrency" value={paymentCurrency} readOnly={true} onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={paymentCurrency}>
              <i className="copy" />
            </CopyToClipboard>
          </div>
          <label className="label">{I18n.t('CreateAccount_PaymentAddress')}</label>
          <div className="key-box">
            <Input name="paymentAddress" value={paymentAddress} readOnly={true} onChange={this.handleChange} className="input-key" />
            <CopyToClipboard onCopy={this.onCopy} text={paymentAddress}>
              <i className="copy" />
            </CopyToClipboard>
          </div>
          <label className="label">Memo</label>
          <div className="key-box">
            <Input name="memo" value={memo} onChange={this.handleChange} readOnly={true} className="input-key" />
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

const mapStateToProps = (state) => ({
  createAccountInfo: state.user.createAccountInfo,
})

export default connect(mapStateToProps)(AccountCreateStep3)
