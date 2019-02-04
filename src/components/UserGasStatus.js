import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'

import './UserGasStatus.scss'

type Props = {

}

class UserGasStatus extends Component<Props> {
  render() {
    const { gasInfo } = this.props

    let usedWidth = (gasInfo.current_total / gasInfo.limit * 100).toFixed(2)
    usedWidth = usedWidth < 5 ? 5 : usedWidth

    return (
      <div className="UserGasStatus">
        <header className="UserGasStatus__title">Your available GAS resource status</header>
        <div className="UserGasStatus__gauge">
          <div className="UserGasStatus__bar" style={{ width: usedWidth + '%' }} />
        </div>
        {gasInfo.current_total === gasInfo.limit
          ? <p className="UserGasStatus__barDescription">Available GAS: {gasInfo.current_total} {I18n.t('gas')} </p>
          : <p className="UserGasStatus__barDescription">{gasInfo.current_total} {I18n.t('gas')} / {gasInfo.limit} {I18n.t('gas')} </p>
        }
      </div>
    )
  }
}

export default UserGasStatus
