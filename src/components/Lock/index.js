import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import Input from 'components/Input'
import Button from 'components/Button'
import { Landing, Toast } from 'components'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'
import utils from 'utils'
import hash from 'hash.js'
import './index.scss'
import ui from "utils/ui";

type Props = {

}

class Lock extends Component<Props> {
  state = {
    password: '',
  }

  componentDidMount() {
    chrome.runtime.sendMessage({
      action: 'SET_LOCK',
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    ui.settingLocation(location)
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
      const _password = hash.sha256().update(password).digest('hex')
      // utils.aesDecrypt(en_password, password)
      if(_password === en_password){
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
            this.moveTo('/accountImport')()
          }
        })      
      }else {
        throw new Error()
      }
    } catch (err) {
      Toast.html(I18n.t('Password_TryAgain'))
      throw new Error('invalid password')
    }
  }

  keyUnlock = (e) => {
    if (e.keyCode == 13) {
      this.unlockWallet()
    }
  }

  render() {
    return (
      <Fragment>
        <Landing />
        <div className="lock-box">
          <Input
            name="password"
            type="password"
            className="input-password"
            onChange={this.handleChange}
            placeholder={I18n.t('Lock_EnterPassword')}
            onKeyDown={this.keyUnlock}
          />
          <Button className="btn-unlockWallet" onClick={this.unlockWallet}>{I18n.t('Lock_Unlock')}</Button>
        </div>
      </Fragment>
    )
  }
}

export default Lock
