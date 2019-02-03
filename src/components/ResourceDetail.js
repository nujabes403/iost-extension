import React, { Component } from 'react'

import GasPledge from 'components/GasPledge'
import RamTrade from 'components/RamTrade'

import './ResourceDetail.scss'

type Props = {

}

class ResourceDetail extends Component<Props> {
  render() {
    const { accountInfo } = this.props
    return !!accountInfo && (
      <div className="ResourceDetail">
        <h1 className="ResourceDetail__title ResourceDetail__title--gas">GAS: </h1>
        <GasPledge gasInfo={accountInfo.gas_info} />
        <hr className="ResourceDetail__hr" />
        <h1 className="ResourceDetail__title ResourceDetail__title--ram">RAM: </h1>
        <RamTrade ramInfo={accountInfo.ram_info} />
      </div>
    )
  }
}

export default ResourceDetail
