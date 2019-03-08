import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import Input from 'components/Input'
import { Header,Toast } from 'components'
import Button from 'components/Button'
import classnames from 'classnames'

import iost from 'iostJS/iost'
import store from '../../store'
import * as userActions from 'actions/user'
import { privateKeyToPublicKey } from 'utils/key'

import ui from "utils/ui";
import './index.scss'

type Props = {

}

class RamManage extends Component<Props> {
  state = {
    buyAmount: '',
    resourceAddress: '',
    isLoading: false,
    isBuy: true,
    ramMarketInfo: {
      buy_price: 0
    },
    userRamInfo: {
      available: 0,
      total: 0,
      used: 0,
    }
  }

  interval = null

  componentDidMount() {
    ui.settingLocation('/GasManage')
    this.interval = setInterval(this.getRAMInfo, 1000)
  }

  getRAMInfo = () => {
    iost.rpc.getProvider().send('get', 'getRAMInfo')
    .then(ramMarketInfo => {
      this.setState({
        ramMarketInfo,
      })
    })
    iost.rpc.blockchain.getAccountInfo(iost.account.getID())
    .then(data => {
      const { available, total, used } = data.ram_info
      this.setState({
        userRamInfo: {
          available: available/1000,
          total: total/1000,
          used: used/1000,
        }
      })
    })
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }


  onToggleDeal = () => {
    this.setState({
      isBuy: !this.state.isBuy
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


  render() {
    const { isBuy, buyAmount, resourceAddress, userRamInfo, ramMarketInfo } = this.state
    const iostAmount = 12312
    const percent = userRamInfo.total?userRamInfo.used/userRamInfo.total*100:0
    return (
      <Fragment>
        <Header title={I18n.t('RamManage_Title')} onBack={this.moveTo('/account')} hasSetting={false} />
        <div className="ramManage-box">
          <div className="progress-box">
            <div className="ram-default">
              <span>RAM</span>
              <span>{userRamInfo.total} KB</span>
            </div>
            <div className="progress-wrap">
              <div className="progress-inner" style={{width: `${percent}%`}}></div>
            </div>
            <div className="ram-used">
              <span>{I18n.t('RamManage_Used')}: {userRamInfo.used}KB</span>
              <span>{I18n.t('RamManage_Remaining')}: {userRamInfo.available}KB</span>
            </div>
          </div>

          <div className="content-box">
            <div className="toggle-title">
              <span className={classnames("toggle-buy", isBuy ? 'active': '')} onClick={this.onToggleDeal}>{I18n.t('RamManage_Buy')}</span>
              <span className={classnames("toggle-sell", isBuy ? '' : 'active')} onClick={this.onToggleDeal}>{I18n.t('RamManage_Sell')}</span>
            </div>
            <div className="toggle-box">
              <div className={classnames("buy-box", isBuy ? 'active': '')}>
                <div className="buy-title">
                  <span className="buy-amount">{I18n.t('RamManage_PurchaseAmount')}</span>
                  <span className="buy-price">{I18n.t('RamManage_PurchasePrice')}: {(ramMarketInfo.buy_price*1000).toFixed(4)} IOST/KB</span>
                </div>
                <Input name="buyAmount" value={buyAmount} placeholder={I18n.t('RamManage_PurchaseEnter')} onChange={this.handleChange} className="input-buyAmount" />
                <p className="equal-iost">{`=${iostAmount} IOST`}</p>

                <span className="address-title">{I18n.t('RamManage_Address')}</span>
                <Input name="resourceAddress" value={resourceAddress} placeholder={I18n.t('RamManage_Optional')} onChange={this.handleChange} className="input-address" />
              </div>

              <div className={classnames("seal-box", isBuy ? '': 'active')}>
                <div className="buy-title">
                  <span className="buy-amount">{I18n.t('RamManage_SellAmount')}</span>
                  <span className="buy-price">{I18n.t('RamManage_SellPrice')}: 9.2334 IOST/KB</span>
                </div>
                <Input name="buyAmount" value={buyAmount} placeholder={I18n.t('RamManage_SellEnter')} onChange={this.handleChange} className="input-buyAmount" />
                <p className="equal-iost">{`=${iostAmount} IOST`}</p>
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

export default connect(mapStateToProps)(RamManage)
