import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'

import LoadingImage from 'components/LoadingImage'
import Tab from 'components/Tab'
import PledgeGas from 'components/PledgeGas'
import UnpledgeGas from 'components/UnpledgeGas'
import UserGasStatus from 'components/UserGasStatus'
import iost from 'iostJS/iost'

import './GasPledge.scss'

type Props = {

}

class GasPledge extends Component<Props> {
  state = {

  }

  render() {
    const { gasInfo } = this.props
    const { current_total, increase_speed, pledged_info } = gasInfo

    const currentlyPledgingGas = pledged_info.reduce((acc, cur) => {
      acc += cur.amount
      return acc
    }, 0)

    return (
      <div className="GasPledge">
        <UserGasStatus gasInfo={gasInfo} />
        <Tab
          tabDict={{
            pledge: <PledgeGas />,
            [I18n.t('unpledge', { length: pledged_info.length })]: <UnpledgeGas pledged_info={pledged_info} />,
          }}
        />
      </div>
    )
  }
}

export default GasPledge
