import React, { Component } from 'react'
import cx from 'classnames'

import Dropdown from 'components/Dropdown'
import iost from 'iostJS/iost.js'

import './NetworkSelector.scss'

type Props = {

}

const iostNetworks = [
  {
    label: 'CUSTOM NETWORK',
    value: 'http://localhost:30001',
  },
  {
    label: 'IOST TESTNET (ZIRAN)',
    value: 'http://13.115.202.226:30001',
  },
  {
    label: 'IOST TESTNET2 (SATOSHI)',
    value: 'http://54.180.106.212:30001',
  },
]

class NetworkSelector extends Component<Props> {
  state = {
    currentNetwork: iostNetworks[0],
  }

  changeNetwork = (url) => {
    iost.changeNetwork(url)
  }

  render() {
    const { className } = this.props
    return (
      <div className={cx('NetworkSelector', className)}>
        <Dropdown
          items={iostNetworks}
          onClick={this.changeNetwork}
        />
      </div>
    )
  }
}

export default NetworkSelector
