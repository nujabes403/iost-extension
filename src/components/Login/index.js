import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import Input from 'components/Input'
import Button from 'components/Button'
import { Landing, Toast } from 'components'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'
import utils from 'utils'

import './index.scss'

type Props = {

}

class Login extends Component<Props> {
  state = {
    password: '',
    repassword: '',
    account: '',
    privateKey: '',
    isChecked: true,
    errorMessage: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: '',
    })
  }

  onCheckPassword = () => {
    const { password, repassword } = this.state
    if(password == null || password.length < 8){
      Toast.html(I18n.t('passwordTip1'))
      return false;
    }
    const reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    if (!reg.test(password)) {
      Toast.html(I18n.t('passwordTip2'))
      return false;
    }
    if (password != repassword) {
      Toast.html(I18n.t('passwordTip3'))
      return false;
    }
    return true
  }

  onImport = () => {
    const { password, isChecked } = this.state
    if (!isChecked) {
      Toast.html(I18n.t('userAgreementTip3'))
      return
    }
    if (this.onCheckPassword()) {
      // save password
      const en_password = utils.aesEncrypt('account', password)
      chrome.storage.local.set({password: en_password})
      chrome.runtime.sendMessage({
        action: 'SET_PASSWORD',
        payload: {
          password
        }
      })
      this.props.changeLocation('/accountImport')
    }
  }

  tryLogin = async () => {
    const { account, privateKey } = this.state
    const { changeLocation } = this.props

    let publicKey
    try {
      publicKey = privateKeyToPublicKey(privateKey)
    } catch (e) {
      publicKey = ''
    }

    const invalidLoginInput = !account || !privateKey || !publicKey

    if (invalidLoginInput) {
      this.throwErrorMessage()
      return
    }

    iost.rpc.blockchain.getAccountInfo(account)
      .then((accountInfo) => {
        if (!iost.isValidAccount(accountInfo, publicKey)) {
          this.throwErrorMessage()
          return
        }

        iost.loginAccount(account, privateKey)
        changeLocation('/account')
      })
      .catch(this.throwErrorMessage)
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

  toggleChecked = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    })
  }

  render() {
    const { password, repassword, isChecked, errorMessage } = this.state
    return (
      <Fragment>
        <Landing />
        <div className="login-box">
          <Input
            name="password"
            type="password"
            className="input-password"
            value={password}
            onChange={this.handleChange}
            placeholder={I18n.t('setPassword')}
          />
          <Input
            name="repassword"
            type="password"
            className="input-password"
            value={repassword}
            onChange={this.handleChange}
            placeholder={I18n.t('repeatPassword')}
          />
          {!!errorMessage && <p className="login-errorMessage">{errorMessage}</p>}
          <div className="line"></div>
          <Button className="btn-accountCreate" onClick={this.tryLogin} disabled={true}>{I18n.t('accountCreate')}</Button>
          <Button className="btn-accountImport" onClick={this.onImport}>{I18n.t('accountImport')}</Button>
          <div className="radio-box">
            <i className={isChecked ? '' : 'noChecked'} onClick={this.toggleChecked} />
            <span>{I18n.t('userAgreementTip1')}<a href='javascript:;' onClick={this.moveTo('/userAgreement')}> {I18n.t('userAgreementTip2')}</a></span>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Login
