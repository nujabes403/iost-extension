import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import Input from 'components/Input'
import Button from 'components/Button'
import { Landing } from 'components'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'


import './index.scss'

type Props = {

}

class Index extends Component<Props> {
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
      errorMessage: I18n.t('invalidLoginInfo'),
    })
  }

  render() {
    const { errorMessage } = this.state
    return (
      <Fragment>
        <Landing />
        <div className="Login">
          <Input
            name="account"
            type="text"
            className="input-password"
            onChange={this.handleChange}
            placeholder={I18n.t('setPassword')}
          />
          <Input
            name="privateKey"
            type="text"
            className="input-password"
            onChange={this.handleChange}
            placeholder={I18n.t('repeatPassword')}
          />
          {!!errorMessage && <p className="Login__errorMessage">{errorMessage}</p>}
          <div className="line"></div>
          <Button className="btn-accountCreate" onClick={this.tryLogin}>{I18n.t('accountCreate')}</Button>
          <Button className="btn-accountImport"onClick={this.tryLogin}>{I18n.t('accountImport')}</Button>
        </div>
      </Fragment>
    )
  }
}

export default Index
