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
          <Button className="btn-accountCreate" onClick={this.moveTo('/accountCreateStep1')}>{I18n.t('accountCreate')}</Button>
          <Button className="btn-accountImport" onClick={this.moveTo('/accountImport')}>{I18n.t('accountImport')}</Button>
        </div>
      </Fragment>
    )
  }
}

export default Index
