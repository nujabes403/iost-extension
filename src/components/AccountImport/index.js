import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'

import Input from 'components/Input'
import { Header } from 'components'
import Button from 'components/Button'
import NetworkSelector from 'components/NetworkSelector'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'

import './index.scss'

type Props = {

}

class AccountImport extends Component<Props> {
  state = {
    account: '',
    privateKey: '',
    errorMessage: '',
  }

  onSubmit = async () => {
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

  render() {
    const { errorMessage } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('accountImport')} onBack={this.moveTo('/login')} />
        <div className="accountImport-box">
          <textarea name="privateKey" id="" className="privateKey-content" onChange={this.handleChange} />
          <Input
            name="account"
            type="text"
            className="input-accountName"
            onChange={this.handleChange}
            placeholder={I18n.t('accountName')}
          />
          <NetworkSelector
            changeLocation={this.props.changeLocation}
            className="Header__NetworkSelector"
          />
          <Button className="btn-submit" onClick={this.onSubmit}>{I18n.t('submit')}</Button>
        </div>
      </Fragment>
    )
  }
}

export default AccountImport
