import React, { Component } from 'react'

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
    this.intervalID = setInterval(this.getTokenBalance, GET_TOKEN_BALANCE_INTERVAL)
  }

  componentWillUnmount() {
    if (this.intervalID) clearInterval(this.intervalID)
  }

  getTokenBalance = async () => {
    const { symbol } = this.props
    const { balance } = await iost.rpc.blockchain.getBalance(iost.account.getID(), symbol)
    this.setState({
      amount: balance,
      isLoading: false,
    })
  }

  render() {
    const { amount, isLoading } = this.state
    const { symbol } = this.props
    return (
      <div className="TokenBalance">
        <img className="TokenBalance__logo" src={iconSrc[symbol]} />
        <span className="TokenBalance__amount">{isLoading ? <LoadingImage /> : amount}</span>
        <span className="TokenBalance__symbol">{symbol}</span>
      </div>
    )
  }
}

export default TokenBalance
