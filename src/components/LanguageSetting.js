import React, { Component } from 'react'

import Dropdown from 'components/Dropdown'

import './LanguageSetting.scss'

type Props = {

}

class LanguageSetting extends Component<Props> {
  render() {
    return (
      <div className="LanguageSetting">
        <header className="LanguageSetting__title">
          Language setting
        </header>
      </div>
    )
  }
}

export default LanguageSetting
