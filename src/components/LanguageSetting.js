import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'

import Dropdown from 'components/Dropdown'
import i18n from 'utils/i18n'


import './LanguageSetting.scss'

type Props = {

}

const languages = [{
  label: 'English',
  value: 'en'
}, {
  label: '한글',
  value: 'ko'
}]

class LanguageSetting extends Component<Props> {
  changeLanguage = (locale) => {
    i18n.setLocale(locale)
  }

  render() {
    return (
      <div className="LanguageSetting">
        <header className="LanguageSetting__title">
          {I18n.t('languageSetting')}
        </header>
        <Dropdown
          className="LanguageSetting__Dropdown"
          items={languages}
          onClick={this.changeLanguage}
        />
      </div>
    )
  }
}

export default LanguageSetting
