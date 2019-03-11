import React, { Component } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import ResourceDetail from 'components/ResourceDetail'
import LoadingImage from 'components/LoadingImage'
import iost from 'iostJS/iost'
import { GET_TOKEN_BALANCE_INTERVAL } from 'constants/token'
import iconSrc from 'constants/icon'

import './index.scss'
import ui from "utils/ui";

type Props = {

}

class Index extends Component<Props> {
  state = {
    amount: 0,
    isLoading: true,
  }

  intervalID = null

  componentDidMount() {
    this.getTokenBalance()
    this.getResourceBalance()
    this.intervalID = setInterval(() => {
      this.getTokenBalance()
      this.getResourceBalance()
    }, GET_TOKEN_BALANCE_INTERVAL)
  }

  componentWillUnmount() {
    if (this.intervalID) clearInterval(this.intervalID)
  }

  getTokenBalance = async () => {
    const { account, selectedTokenSymbol } = this.props
    const url = account.network == 'MAINNET'?'https://api.iost.io':'http://13.52.105.102:30001';
    iost.changeNetwork(url)
    const { balance, frozen_balances } = await iost.rpc.blockchain.getBalance(iost.account.getID(), selectedTokenSymbol)

    let frozenAmount = 0

    if (frozen_balances && frozen_balances.length !== 0) {
      frozenAmount = frozen_balances.reduce((acc, cur) => (acc += cur.amount, acc), 0)
    }

    this.setState({
      amount: balance,
      frozenAmount,
      isLoading: false,
    })
  }

  getResourceBalance = async () => {
    const accountInfo = await iost.rpc.blockchain.getAccountInfo(iost.account.getID())
    this.setState({
      accountInfo,
      gas: accountInfo.gas_info && accountInfo.gas_info.current_total,
      gas_used: accountInfo.gas_info && Number((accountInfo.gas_info.limit - accountInfo.gas_info.current_total).toFixed(4)),
      ram: accountInfo.ram_info && accountInfo.ram_info.available,
      ram_used: accountInfo.ram_info && accountInfo.ram_info.used,
      isLoading: false,
    })
  }

  render() {
    const { frozenAmount, accountInfo, amount, gas, gas_used, ram, ram_used, isLoading } = this.state
    const { selectedTokenSymbol, account, moveTo } = this.props
    const url = account?`${account.network == 'MAINNET'?'https://explorer.iost.io':'http://54.249.186.224'}/account/${account.name}`:'#'
    return (
      <div className="TokenBalance-box">
        <a target={account?"_blank":''} href={url}>
          <div className="logo-box">
            <img className="logo" src={iconSrc[selectedTokenSymbol]} />
          </div>
          <div className="TokenBalance-amount-box">
            <span className="TokenBalance__amount">{isLoading ? <LoadingImage /> : amount}</span>
            <span className="TokenBalance__symbol">{selectedTokenSymbol}</span>
            {/*(frozenAmount !== 0) && <span className="TokenBalance__frozenBalance"> (+ {frozenAmount})</span>*/}
          </div>
        </a>

        {!isLoading && (
          <div className="TokenBalance__resources">
            <p className="TokenBalance__gas" onClick={moveTo('/gasManage')}>iGAS：{parseInt(gas_used)} {I18n.t('GasManage_Lock')}/{parseInt(gas)} {I18n.t('GasManage_Available')}</p>
            <p className="TokenBalance__ram" onClick={moveTo('/ramManage')}>iRAM：{ram_used} {I18n.t('RamManage_Used')}/{ram} {I18n.t('RamManage_Remaining')}</p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedTokenSymbol: state.token.selectedTokenSymbol,
})

export default connect(mapStateToProps)(Index)
