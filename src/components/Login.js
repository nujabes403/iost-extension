import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'

import Input from 'components/Input'
import Button from 'components/Button'
import Landing from 'components/Landing'
import TokenBalance from 'components/TokenBalance'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'

import './Login.scss'

type Props = {

}

class Login extends Component<Props> {
  state = {
    account: '',
    privateKey: '',
    errorMessage: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: '',
    })
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
      errorMessage: I18n.t('invalidLoginInfo')
    })
  }

  render() {
    const { errorMessage } = this.state
    return (
      <Fragment>
        <Landing />
        <div className="Login">
          <label className="Login__label Login__label--account">
            {I18n.t('accountName')}:
          </label>
          <Input
            name="account"
            className="Login__input"
            onChange={this.handleChange}
          />
          <label className="Login__label Login__label--privateKey">
            {I18n.t('plasePastePrivateKey')}:
          </label>
          <Input
            name="privateKey"
            type="password"
            className="Login__input"
            onChange={this.handleChange}
          />
          {!!errorMessage && <p className="Login__errorMessage">{errorMessage}</p>}
          <Button
            className="Login__button"
            onClick={this.tryLogin}
          >
            {I18n.t('login')}:
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default Login
