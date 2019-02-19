import React, { Component } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import ResourceDetail from 'components/ResourceDetail'
import LoadingImage from 'components/LoadingImage'
import iost from 'iostJS/iost'
import { GET_TOKEN_BALANCE_INTERVAL } from 'constants/token'
import iconSrc from 'constants/icon'

import './TokenBalance.scss'

type Props = {

}

class TokenBalance extends Component<Props> {
  state = {
    amount: 0,
    isLoading: true,
  }

  intervalID = null

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.getTokenBalance()
      this.getResourceBalance()
    }, GET_TOKEN_BALANCE_INTERVAL)
  }

  componentWillUnmount() {
    if (this.intervalID) clearInterval(this.intervalID)
  }

  getTokenBalance = async () => {
    const { selectedTokenSymbol } = this.props
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
      ram: accountInfo.ram_info && accountInfo.ram_info.available,
      isLoading: false,
    })
  }

  render() {
    const { frozenAmount, accountInfo, amount, gas, ram, isLoading } = this.state
    const { selectedTokenSymbol } = this.props
    return (
      <div className="TokenBalance">
        <img className="TokenBalance__logo" src={iconSrc[selectedTokenSymbol]} />
        <span className="TokenBalance__amount">{isLoading ? <LoadingImage /> : amount}</span>
        <span className="TokenBalance__symbol">{selectedTokenSymbol}</span>
        {(frozenAmount !== 0) && <span className="TokenBalance__frozenBalance"> (+ {frozenAmount})</span>}
        {!isLoading && (
          <div className="TokenBalance__resources">
            <span className="TokenBalance__gasResource">{I18n.t('iGAS')}: {gas}</span>
            &nbsp;/&nbsp;
            <span className="TokenBalance__ramResource">{I18n.t('iRAM')}: {ram}</span>
            <span
              className="TokenBalance__viewResourceDetail"
              onClick={() => ui.openPopup({
                content: <ResourceDetail accountInfo={accountInfo} />
              })}
            >
              {I18n.t('viewResourceDetail')}
            </span>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedTokenSymbol: state.token.selectedTokenSymbol,
})

export default connect(mapStateToProps)(TokenBalance)
