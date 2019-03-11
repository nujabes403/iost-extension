import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import Input from 'components/Input'
import { Header,Toast, LoadingImage } from 'components'
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
    isStake: true,
    userGasInfo: {
      current_total: 0,
      limit: 0,
    },
    frozen_balances: 0,
    pledged_amount: 0,
    balance:0,
    buyAmount: '',
    sellAmount: ''
  }
  interval = null

  componentDidMount() {
    ui.settingLocation('/GasManage')
    this.interval = setInterval(this.getGasInfo, 1000)
  }

  getGasInfo = () => {
    iost.rpc.blockchain.getAccountInfo(iost.account.getID())
    .then(data => {
      const {gas_info: { current_total, limit, pledged_info }, balance, frozen_balances, } = data
      this.setState({
        userGasInfo: {
          current_total,
          limit
        },
        balance,
        frozen_balances: frozen_balances.reduce((prev, next) => {
          return prev+=next.amount
        },0),
        pledged_amount: pledged_info.reduce((prev, next) => {
          return prev+=next.amount
        },0),
      })
    })
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

  onSubmit = () => {
    const { isStake, buyAmount, resourceAddress, sellAmount } = this.state
    const account = iost.account.getID()
    if(isStake){
      iost.sendTransaction('gas.iost', 'pledge', [account, resourceAddress || account, buyAmount])
      .onPending(() => {
        this.setState({
          isLoading: true,
        })
      })
      .onSuccess((response) => {
        this.setState({ isLoading: false })
        // ui.openPopup({ content: <TransactionSuccess tx={response} /> })
      })
      .onFailed((err) => {
        this.setState({ isLoading: false })
        // ui.openPopup({ content: <TransactionFailed tx={err} /> })
      })
    }else{
      iost.sendTransaction('gas.iost', 'unpledge', [account, resourceAddress || account, sellAmount])
        .onPending(() => {
          this.setState({
            isLoading: true,
          })
        })
        .onSuccess((response) => {
          this.setState({ isLoading: false })
          // ui.openPopup({ content: <TransactionSuccess tx={response} /> })
        })
        .onFailed((err) => {
          this.setState({ isLoading: false })
          // ui.openPopup({ content: <TransactionFailed tx={err} /> })
        })
    }
  }

  render() {
    const { isStake, buyAmount, sellAmount, resourceAddress, userGasInfo, balance, isLoading, frozen_balances, pledged_amount } = this.state
    const percent = userGasInfo.limit?((1-userGasInfo.current_total/userGasInfo.limit)*100):0
    return (
      <Fragment>
        <Header title={I18n.t('GasManage_Title')} onBack={this.moveTo('/account')} hasSetting={false} />
        <div className="gasManage-box">
          <div className="progress-box">
            <div className="ram-default">
              <span>GAS</span>
              <span>{userGasInfo.limit} GAS</span>
            </div>
            <div className="progress-wrap">
              <div className="progress-inner" style={{width: `${percent}%`}}></div>
            </div>
            <div className="ram-used">
              <span>{I18n.t('GasManage_Locked')}: {Number((userGasInfo.limit-userGasInfo.current_total).toFixed(4))}GAS</span>
              <span>{I18n.t('GasManage_Available')}: {Number(userGasInfo.current_total.toFixed(4))}GAS</span>
            </div>
          </div>

          {frozen_balances ? <div className="selling-gas"><span><b>赎回中 GAS</b></span><span>{frozen_balances} IOST</span></div>: ''}

          <div className="gas-content-box">
            <div className="toggle-title">
              <span className={classnames("toggle-buy", isStake ? 'active': '')} onClick={this.onToggleDeal()}>{I18n.t('GasManage_Stake')}</span>
              <span className={classnames("toggle-sell", isStake ? '' : 'active')} onClick={this.onToggleDeal(false)}>{I18n.t('GasManage_UnStake')}</span>
            </div>
            <div className="toggle-box">
              <div className={classnames("buy-box", isStake ? 'active': '')}>
                <div className="buy-title">
                  <span className="buy-amount">{I18n.t('GasManage_StakeAmount')}</span>
                  <span className="buy-price">{I18n.t('GasManage_Balance')}: {balance} IOST</span>
                </div>
                <Input name="buyAmount" value={buyAmount} placeholder={I18n.t('GasManage_StakeEnter')} onChange={this.handleChange} className="input-buyAmount" />

                <span className="address-title">{I18n.t('GasManage_StakeAddress')}</span>
                <Input name="resourceAddress" value={resourceAddress} placeholder={I18n.t('GasManage_Optional')} onChange={this.handleChange} className="input-address" />
              </div>

              <div className={classnames("seal-box", isStake ? '': 'active')}>
                <div className="buy-title">
                  <span className="buy-amount">{I18n.t('GasManage_UnStakeAmount')}</span>
                  <span className="buy-price">{'可退换'}: {pledged_amount} IOST</span>
                </div>
                <Input name="sellAmount" value={sellAmount} placeholder={I18n.t('GasManage_StakeEnter')} onChange={this.handleChange} className="input-buyAmount" />

                <span className="address-title">{I18n.t('GasManage_UnStakeAddress')}</span>
                <Input name="resourceAddress" value={resourceAddress} placeholder={I18n.t('GasManage_Optional')} onChange={this.handleChange} className="input-address" />
              </div>
            </div>
            <Button className="gas-btn-submit" onClick={this.onSubmit}>{isLoading?<LoadingImage />: I18n.t('Transfer_Submit')}</Button>
            {isStake?'':<p>*赎回资源需要3⾃自然⽇日，期间赎回中⾦金金额不不可⽤用。</p>}
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
