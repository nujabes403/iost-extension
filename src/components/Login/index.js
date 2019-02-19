import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import Input from 'components/Input'
import Button from 'components/Button'
import { Landing } from 'components'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'
import utils from 'utils'

import './index.scss'

type Props = {

}

class Index extends Component<Props> {
  state = {
    password: '',
    repassword: '',
    errorMessage: '',

    account: '',
    privateKey: '',
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
      return false;
    }
    const reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
    if (!reg.test(password)){
      return false;
    }
    if(password != repassword){
      return false;
    }
    return true
  }

  onImport = () => {
    const { password } = this.state
    if(this.onCheckPassword()){
      // save password
      const en_password = utils.aesEncrypt('account', password)
      chrome.storage.local.set({password: en_password})
      chrome.runtime.sendMessage({
        action: 'SET_PASSWORD',
        payload: {
          password
        }
      })
      this.props.changeLocation('/AccountImport')
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

  render() {
    const { password, repassword, errorMessage } = this.state
    return (
      <Fragment>
        <Landing />
        <div className="Login">
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
          {!!errorMessage && <p className="Login__errorMessage">{errorMessage}</p>}
          <div className="line"></div>
          <Button className="btn-accountCreate" onClick={this.tryLogin}>{I18n.t('accountCreate')}</Button>
          <Button className="btn-accountImport" onClick={this.onImport}>{I18n.t('accountImport')}</Button>
        </div>
      </Fragment>
    )
  }
}

export default Index
