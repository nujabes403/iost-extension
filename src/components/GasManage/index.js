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
import classnames from "classnames";

type Props = {

}

class GasManage extends Component<Props> {
  state = {
    account: '',
    isLoading: false,
    illegal: false,
    isStake: true
  }

  componentDidMount() {
    ui.settingLocation('/GasManage')
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  onToggleDeal = (value = true) => () => {
    this.setState({
      isStake: value
    })
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
    const { isStake, buyAmount, resourceAddress } = this.state
    const iostAmount = 12312
    return (
      <Fragment>
        <Header title={I18n.t('GasManage_Title')} onBack={this.moveTo('/account')} hasSetting={false} />
        <div className="gasManage-box">
          <div className="progress-box">
            <div className="ram-default">
              <span>GAS</span>
              <span>30000 KB</span>
            </div>
            <div className="progress-wrap">
              <div className="progress-inner" style={{width: '50px'}}></div>
            </div>
            <div className="ram-used">
              <span>{I18n.t('GasManage_Locked')}: xGAS</span>
              <span>{I18n.t('GasManage_Available')}: xGAS</span>
            </div>
          </div>

          <div className="content-box">
            <div className="toggle-title">
              <span className={classnames("toggle-buy", isStake ? 'active': '')} onClick={this.onToggleDeal()}>{I18n.t('GasManage_Stake')}</span>
              <span className={classnames("toggle-sell", isStake ? '' : 'active')} onClick={this.onToggleDeal(false)}>{I18n.t('GasManage_UnStake')}</span>
            </div>
            <div className="toggle-box">
              <div className={classnames("buy-box", isStake ? 'active': '')}>
                <div className="buy-title">
                  <span className="buy-amount">{I18n.t('GasManage_StakeAmount')}</span>
                  <span className="buy-price">{I18n.t('GasManage_Balance')}: 9.2334 IOST</span>
                </div>
                <Input name="buyAmount" value={buyAmount} placeholder={I18n.t('GasManage_StakeEnter')} onChange={this.handleChange} className="input-buyAmount" />

                <span className="address-title">{I18n.t('GasManage_StakeAddress')}</span>
                <Input name="resourceAddress" value={resourceAddress} placeholder={I18n.t('GasManage_Optional')} onChange={this.handleChange} className="input-address" />
              </div>

              <div className={classnames("seal-box", isStake ? '': 'active')}>
                <div className="buy-title">
                  <span className="buy-amount">{I18n.t('GasManage_StakeAmount')}</span>
                  <span className="buy-price">{I18n.t('GasManage_Balance')}: 9.2334 IOST</span>
                </div>
                <Input name="buyAmount" value={buyAmount} placeholder={I18n.t('GasManage_StakeEnter')} onChange={this.handleChange} className="input-buyAmount" />

                <span className="address-title">{I18n.t('GasManage_StakeAddress')}</span>
                <Input name="resourceAddress" value={resourceAddress} placeholder={I18n.t('GasManage_Optional')} onChange={this.handleChange} className="input-address" />
              </div>
            </div>
            <Button className="btn-submit">{I18n.t('Transfer_Submit')}</Button>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(GasManage)
