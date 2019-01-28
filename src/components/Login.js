import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'

import Input from 'components/Input'
import Button from 'components/Button'
import Landing from 'components/Landing'
import TokenBalance from 'components/TokenBalance'
import iost from 'iostJS/iost'

import './Login.scss'

type Props = {

}

class Login extends Component<Props> {
  state = {
    privateKey: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  tryLogin = async () => {
    const { account, privateKey } = this.state
    const { changeLocation } = this.props

    iost.loginAccount(account, privateKey)
    changeLocation('/account')
  }

  render() {
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
