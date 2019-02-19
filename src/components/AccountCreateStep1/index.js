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

class AccountCreateStep1 extends Component<Props> {
  state = {
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

  render() {
    const { errorMessage } = this.state
    const isLoading = true
    return (
      <Fragment>
        <Header title={I18n.t('accountCreate')} onBack={this.moveTo('/login')} hasSetting={false} />
        <div className="accountCreateStep1-box">
          <p className="title">{I18n.t('setAccountName')}</p>
          <p className="rule">{I18n.t('setNameRule')}</p>
          <Input
            name="account"
            type="text"
            className="input-accountName"
            onChange={this.handleChange}
          />
          {
            isLoading ? <p className="rule">{I18n.t('queryAvailable')}</p> : ''
          }
          <Button className="btn-nextStep" onClick={this.moveTo('/accountCreateStep2')}>{I18n.t('nextStep')}</Button>
        </div>
      </Fragment>
    )
  }
}

export default AccountCreateStep1
