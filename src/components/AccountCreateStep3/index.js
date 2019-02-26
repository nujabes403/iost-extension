import React, { Component, Fragment } from 'react'
import {connect} from "react-redux";
import { I18n } from 'react-redux-i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import Input from 'components/Input'
import { Header, Toast } from 'components'
import Button from 'components/Button'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'
import utils from 'utils';
import './index.scss'
import * as userActions from "actions/user";
import store from "../../store";

const getAccounts = () => new Promise((resolve, reject) => {
  chrome.storage.local.get(['accounts'], ({accounts}) => {
    resolve(accounts || [])
  })
})

type Props = {

}

class AccountCreateStep3 extends Component<Props> {
  state = {
    paymentCurrency: '100 IOST',
    paymentAddress: 'exchange.iost',
    memo: '',
  }

  componentDidMount() {
    const { createAccountInfo: { name, publicKey} } = this.props
    this.setState({
      memo: `create:${name}:${publicKey}:${publicKey}`
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
    const { createAccountInfo: { name, publicKey, privateKey} } = this.props
    chrome.runtime.sendMessage({
      action: 'CHECK_CREATE_ACCOUNT',
      payload: {
        name,
        publicKey,
        privateKey
      }
    })
    try {
      // 如果没有找到账户信息，就会报错
      await iost.rpc.blockchain.getAccountInfo(name)
      chrome.runtime.sendMessage({
        action: 'GET_PASSWORD',
      },(res)=> {
        let accounts = await getAccounts()
        const hash = {}
        accounts.push({
          name,
          network: 'MAINNET',
          privateKey: utils.aesDecrypt(privateKey, res),
          publicKey,
        })
        accounts = accounts.reduce((prev, next) => {
          const _h = `${next.name}_${next.network}`
          hash[_h] ? '' : hash[_h] = true && prev.push(next);
          return prev
        },[]);
        chrome.storage.local.set({accounts: accounts})
        Toast.html(I18n.t('CreateAccount_ToastTip3'))
        this.moveTo('/accountManage')()
      })
      
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
