import React, { Component } from 'react'

import Button from 'components/Button'
import NetworkSetting from 'components/NetworkSetting'
import LanguageSetting from 'components/LanguageSetting'

import './Settings.scss'

type Props = {

}

class Settings extends Component<Props> {
  render() {
    const { changeLocation } = this.props
    return (
      <div className="Settings">
        <Button
          onClick={() => changeLocation('/account')}
          className="Settings__closeButton"
        />
        <NetworkSetting changeLocation={changeLocation} />
        <LanguageSetting />
      </div>
    )
  }
}

export default Settings
