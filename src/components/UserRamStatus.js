import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'

import './UserRamStatus.scss'

type Props = {

}

class UserRamStauts extends Component<Props> {
  render() {
    const { ramInfo } = this.props

    let availWidth = (ramInfo.available / ramInfo.total * 100).toFixed(2)
    availWidth = availWidth < 5 ? 5 : availWidth

    return (
      <div className="UserRamStatus">
        <header className="UserRamStatus__title">Your available RAM resource status</header>
        <div className="UserRamStatus__gauge">
          <div className="UserRamStatus__bar" style={{ width: availWidth + '%' }} />
        </div>
        <p className="UserRamStauts__barDescription">{ramInfo.available} {I18n.t('bytes')} / {ramInfo.total} {I18n.t('bytes')} </p>
      </div>
    )
  }
}

export default UserRamStauts
