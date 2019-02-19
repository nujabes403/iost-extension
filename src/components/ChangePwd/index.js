import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'

import Input from 'components/Input'
import { Header } from 'components'
import Button from 'components/Button'

import './index.scss'

type Props = {

}

class AccountSetting extends Component<Props> {
  state = {
    currentPwd: '',
    newPwd: '',
    repeatNewPwd: '',
    errorMessage: '',
    isCurrentPwd: false,    // 输入当前密码是否正确
    isDifferent: false,    // 两次设置的新密码是否一致
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: '',
    })
  }

  onCheckCurrentPwd = () => {
    const { currentPwd } = this.state

    if (currentPwd == '123') {
      this.setState({
        isCurrentPwd: true
      })
    }
  }

  onCheckNewPwd = () => {
    const { newPwd, repeatNewPwd } = this.state

    if (newPwd != repeatNewPwd) {
      this.setState({
        isDifferent: true
      })
    } else {
      this.setState({
        isDifferent: false
      })
    }
  }

  onUpdatePwd = () => {
    if (true) {
      console.log(111)
      this.moveTo('/accountSetting')()
    }
  }

  render() {
    const { currentPwd, newPwd, repeatNewPwd, isCurrentPwd, errorMessage, isDifferent } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('changePwd')} onBack={this.moveTo('/accountSetting')} hasSetting={false} />
        <div className="changePwd-box">
          <Input
            name="currentPwd"
            onChange={this.handleChange}
            onBlur={this.onCheckCurrentPwd}
            className="input-pwd"
            placeholder={I18n.t('inputCurrentPwd')}
          />
          {
            !isCurrentPwd ? <p className="approved">{I18n.t('approved')}</p> : ''
          }
          <Input
            name="newPwd"
            onChange={this.handleChange}
            className="input-pwd"
            placeholder={I18n.t('setNewPwd')}
          />
          <Input
            name="repeatNewPwd"
            onChange={this.handleChange}
            className="input-pwd"
            placeholder={I18n.t('repeatNewPwd')}
            onBlur={this.onCheckNewPwd}
          />
          {
            isDifferent ? <p className="verify-error">{I18n.t('tryAgainPwd')}</p> : ''
          }
          <Button className="btn-setting" onClick={this.onUpdatePwd}>{I18n.t('changePwd')}</Button>
        </div>
      </Fragment>
    )
  }
}

export default AccountSetting
