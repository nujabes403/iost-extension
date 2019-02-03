import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'

import './UserRamStatus.scss'

type Props = {

}

class UserRamStauts extends Component<Props> {
  render() {
    const { ramInfo } = this.props

    let usedWidth = (ramInfo.used / ramInfo.total * 100).toFixed(2)
    usedWidth = usedWidth < 5 ? 5 : usedWidth

    return (
      <div className="UserRamStatus">
        <header className="UserRamStatus__title">Your RAM resource status</header>
        <div className="UserRamStatus__gauge">
          <div className="UserRamStatus__bar" style={{ width: usedWidth + '%' }} />
        </div>
        <p className="UserRamStauts__barDescription">{ramInfo.used} {I18n.t('bytes')} / {ramInfo.total} {I18n.t('bytes')} </p>
      </div>
    )
  }
}

export default UserRamStauts
