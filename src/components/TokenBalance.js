import React, { Component } from 'react'
import { connect } from 'react-redux'

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
    const { balance } = await iost.rpc.blockchain.getBalance(iost.account.getID(), selectedTokenSymbol)
    this.setState({
      amount: balance,
      isLoading: false,
    })
  }

  getResourceBalance = async () => {
    const { gas_info, ram_info } = await iost.rpc.blockchain.getAccountInfo(iost.account.getID())
    this.setState({
      gas: gas_info && gas_info.current_total,
      ram: ram_info && ram_info.available,
      isLoading: false,
    })
  }

  render() {
    const { amount, gas, ram, isLoading } = this.state
    const { selectedTokenSymbol } = this.props
    return (
      <div className="TokenBalance">
        <img className="TokenBalance__logo" src={iconSrc[selectedTokenSymbol]} />
        <span className="TokenBalance__amount">{isLoading ? <LoadingImage /> : amount}</span>
        <span className="TokenBalance__symbol">{selectedTokenSymbol}</span>
        <div className="TokenBalance__resources">
          <span className="TokenBalance__gasResource">iGAS: {gas}</span>
          &nbsp;/&nbsp;
          <span className="TokenBalance__ramResource">iRAM: {ram}</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedTokenSymbol: state.token.selectedTokenSymbol,
})

export default connect(mapStateToProps)(TokenBalance)
