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

class Lock extends Component<Props> {
  state = {
    password: '',
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

  unlockWallet = () => {
    this.moveTo('/account')()
  }


  render() {
    const { errorMessage } = this.state
    return (
      <Fragment>
        <Landing />
        <div className="lock-box">
          <Input
            name="password"
            type="text"
            className="input-password"
            onChange={this.handleChange}
            placeholder={I18n.t('inputPwd')}
          />
          {!!errorMessage && <p className="lock-errorMessage">{errorMessage}</p>}
          <Button className="btn-unlockWallet" onClick={this.unlockWallet}>{I18n.t('unlockWallet')}</Button>
        </div>
      </Fragment>
    )
  }
}

export default Lock
