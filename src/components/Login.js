import React, { Component, Fragment } from 'react'

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
          <label className="Login__label Login__label--account">Account Name:</label>
          <Input
            name="account"
            className="Login__input"
            onChange={this.handleChange}
          />
          <label className="Login__label Login__label--privateKey">Please paste your private key:</label>
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
            Login
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default Login
