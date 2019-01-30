import React, { Component } from 'react'
import cx from 'classnames'
import _ from 'lodash'

import Dropdown from 'components/Dropdown'
import iost from 'iostJS/iost.js'

import './NetworkSelector.scss'

type Props = {

}

const _iostNetworks = [
  {
    label: 'IOST TESTNET (EVEREST 2.0)',
    value: 'http://13.52.105.102:30001',
  },
]

class NetworkSelector extends Component<Props> {
  state = {
    iostNetworks: _iostNetworks,
  }

  componentDidMount() {
    // Network list
    chrome.storage.sync.get(['networkList'], (result) => {
      const networkList = result && result.networkList
      if (!networkList) return

      this.setState({
        iostNetworks: [...this.state.iostNetworks, ...networkList]
      })
    })

    // Active network
    chrome.storage.sync.get(['activeNetwork'], (result) => {
      const activeNetwork = result && result.activeNetwork

      if (!activeNetwork) {
        // Set default network to iost instance.
        this.changeNetwork(this.state.iostNetworks[0].value)
        return
      }

      const isKnownNetworkIdx = _.findIndex(this.state.iostNetworks, {
        value: activeNetwork
      })

      this.$Dropdown.select(isKnownNetworkIdx !== -1 ? isKnownNetworkIdx : 0)()
    })
  }

  changeNetwork = (url) => {
    iost.changeNetwork(url)
  }

  render() {
    const { iostNetworks } = this.state
    const { className } = this.props
    return (
      <div className={cx('NetworkSelector', className)}>
        <Dropdown
          items={iostNetworks}
          onClick={this.changeNetwork}
          ref={($Dropdown => this.$Dropdown = $Dropdown)}
        />
      </div>
    )
  }
}

export default NetworkSelector
