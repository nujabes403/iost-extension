import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

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
        <h1 className="ResourceDetail__title ResourceDetail__title--gas">
          GAS <img
              src="/static/images/questionMark.svg"
              className="ResourceDetail__questionMark"
              data-tip
              data-for="gasDescription"
            />
        </h1>
        <ReactTooltip
          id="gasDescription"
          place="bottom"
          offset={{ right: 100 }}
        >
          <p>- GAS is the resource used <strong>for transaction execution.</strong></p>
          <p>- GAS consumed by the execution of the transaction will be destroyed.</p>
          <p>- There are 3 different methods to get GAS: </p>
          <p>- 1) Pledging IOST yourself, </p>
          <p>- 2) Someone pledging IOST to you </p>
          <p>- 3) Someone transfer GAS to you (currently not supported)</p>
        </ReactTooltip>
        <GasPledge gasInfo={accountInfo.gas_info} />
        <hr className="ResourceDetail__hr" />
        <h1 className="ResourceDetail__title ResourceDetail__title--ram">
          RAM <img
              src="/static/images/questionMark.svg"
              className="ResourceDetail__questionMark"
              data-tip
              data-for="ramDescription"
            />
        </h1>
        <ReactTooltip
          id="ramDescription"
          place="bottom"
          offset={{ right: 100 }}
        >
          <p>- RAM is the resource used <strong>for space.</strong></p>
          <p>- The fee for purchasing RAM will be destroyed.</p>
          <p>- There are 3 different methods to get RAM: </p>
          <p>- 1) Buying RAM yourself, </p>
          <p>- 2) Someone buying RAM for you </p>
          <p>- 3) Someone transfer RAM to you</p>
        </ReactTooltip>
        <RamTrade ramInfo={accountInfo.ram_info} />
      </div>
    )
  }
}

export default ResourceDetail
