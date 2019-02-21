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

class Lock extends Component<Props> {
  state = {
    password: '',
    errorMessage: '',
  }

  componentDidMount() {
    chrome.runtime.sendMessage({
      action: 'SET_LOCK',
    })
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

  unlockWallet = async () => {
    const { password } = this.state
    const getEnPassword = () => new Promise((resolve, reject) => {
      chrome.storage.local.get(['password'],({password: en_password}) => {
        if(en_password){
          resolve(en_password)
        }else{
          reject()
        }
      })
    })
    try {
      const en_password = await getEnPassword()
      utils.aesDecrypt(en_password, password)
      chrome.runtime.sendMessage({
        action: 'SET_PASSWORD',
        payload: {
          password
        }
      })
      chrome.storage.local.get(['accounts'], ({accounts}) => {
        if(accounts.length){
          this.moveTo('/account')()
        }else {
          this.moveTo('/AccountImport')()
        }
      })      
    } catch (err) {
      Toast.html(I18n.t('passwordTip4'))
      throw new Error('invalid password')
    }
  }


  render() {
    const { errorMessage } = this.state
    return (
      <Fragment>
        <Landing />
        <div className="lock-box">
          <Input
            name="password"
            type="password"
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
