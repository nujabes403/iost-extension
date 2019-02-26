import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import Input from 'components/Input'
import { Header,Toast } from 'components'
import Button from 'components/Button'
import NetworkSelector from 'components/NetworkSelector'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey } from 'utils/key'

import ui from "utils/ui";
import './index.scss'

type Props = {

}

class AccountCreateStep1 extends Component<Props> {
  state = {
    errorMessage: '',
    isLoading: false,
    account: '',
  }

  componentDidMount() {
    ui.settingLocation('/accountCreateStep1')
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  
  onNext = async () => {
    this.setState({
      isLoading: true
    })
    const { account } = this.state
    try {
      await iost.rpc.blockchain.getAccountInfo(account)
      Toast.html('账号已存在', 100)
    } catch (err) {
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

  onDeleteAll = () => {
    this.setState({
      account: ''
    })
  }

  render() {
    const { errorMessage, isLoading } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('firstLogin_CreateAccount')} onBack={this.backTo} hasSetting={false} />
        <div className="accountCreateStep1-box">
          <p className="title">{I18n.t('CreateAccount_AccountName')}</p>
          <p className="rule">{I18n.t('CreateAccount_Tip1')}</p>
          <div className="accountName-box">
            <Input name="account" type="text" onChange={this.handleChange} className="input-accountName" value={this.state.account}/>
            <i className="deleteAll" onClick={this.onDeleteAll}>X</i>
          </div>
          {
            isLoading ? <p className="rule">{I18n.t('CreateAccount_QueryStatus')}</p> : ''
          }
          <Button className="btn-nextStep" onClick={this.onNext}>{I18n.t('CreateAccount_NextStep')}</Button>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(AccountCreateStep1)
