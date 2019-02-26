import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import Input from 'components/Input'
import { Header,Toast } from 'components'
import Button from 'components/Button'
import iost from 'iostJS/iost'
import store from '../../store'
import * as userActions from 'actions/user'
import { privateKeyToPublicKey } from 'utils/key'

import ui from "utils/ui";
import './index.scss'

type Props = {

}

class AccountCreateStep1 extends Component<Props> {
  state = {
    account: '',
    isLoading: false,
    illegal: false,
  }

  componentDidMount() {
    ui.settingLocation('/accountCreateStep1')
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }
  
  onNext = async () => {
    this.setState({
      isLoading: true
    })
    const { account, illegal } = this.state
    if (account == '' || this.onBlur()) {
      return
    }
    try {
      // 如果没有找到账户信息，就会报错
      await iost.rpc.blockchain.getAccountInfo(account)
      Toast.html(I18n.t('CreateAccount_AccountExist'))
    } catch (err) {
      store.dispatch(userActions.createAccountInfo({name: account}))
      this.moveTo('/accountCreateStep2')()
    }
    this.setState({
      isLoading: false
    })
  }

  backTo = () => {
    const { changeLocation, locationList } = this.props
    ui.deleteLocation()
    changeLocation(locationList[locationList.length - 1])
  }

  onBlur = () => {
    const { account, illegal } = this.state
    const reg = new RegExp(/^[A-Za-z1-9]{5,11}$/);
    if (!reg.test(account)){
      this.setState({
        illegal: true
      })
    }
    return illegal
  }

  onFocus = () => {
    this.setState({
      illegal: false
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  deleteAll = () => {
    this.setState({
      account: '',
    })
  }

  render() {
    const { isLoading, illegal, account } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('firstLogin_CreateAccount')} onBack={this.backTo} hasSetting={false} />
        <div className="accountCreateStep1-box">
          <p className="title">{I18n.t('CreateAccount_AccountName')}</p>
          <p className="rule">{I18n.t('CreateAccount_Tip1')}</p>
          <div className="accountName-box">
            <Input
              name="account"
              type="text"
              value={this.state.account}
              onChange={this.handleChange}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              className="input-accountName"


            />
            {
              illegal ? <i className="illegal" onClick={this.deleteAll}>X</i> : ''
            }
          </div>
          {
            isLoading ? <p className="rule">{I18n.t('CreateAccount_QueryStatus')}</p> : ''
          }
          <Button className="btn-nextStep" onClick={this.onNext} disabled={account == ''}>{I18n.t('CreateAccount_NextStep')}</Button>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(AccountCreateStep1)
