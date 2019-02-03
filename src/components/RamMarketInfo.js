import React, { Component } from 'react'

import iost from 'iostJS/iost'

import './RamMarketInfo.scss'

type Props = {

}

class RamMarketInfo extends Component<Props> {
  render() {
    const { ramMarketInfo } = this.props

    if (!ramMarketInfo) return <div />

      const usedRamPercent = (Number(ramMarketInfo.used_ram) / Number(ramMarketInfo.total_ram) * 100).toFixed(0)

    return (
      <div className="RamMarketInfo">
        <p>Buying price of RAM (IOST/byte): {ramMarketInfo.buy_price}</p>
        <p>Selling price of RAM (IOST/byte): {ramMarketInfo.sell_price}</p>
        <p>RAM usage: {ramMarketInfo.used_ram} bytes ({usedRamPercent}%)</p>
        <p>Available RAM: {ramMarketInfo.available_ram} bytes</p>
      </div>
    )
  }
}

export default RamMarketInfo
