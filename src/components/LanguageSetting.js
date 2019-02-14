import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'

import Dropdown from 'components/Dropdown'
import i18n from 'utils/i18n'


import './LanguageSetting.scss'

type Props = {

}

const localeToLabel = {
  'en': 'English',
  'ko': '한글',
}

const languages = [{
  label: localeToLabel['en'],
  value: 'en'
}, {
  label: localeToLabel['ko'],
  value: 'ko'
}]

class LanguageSetting extends Component<Props> {
  changeLanguage = (locale) => {
    i18n.setLocale(locale)
  }

  render() {
    const locale = i18n.getLocale()
    const defaultValue = {
      label: localeToLabel[locale],
      value: locale,
    }
    console.log(locale, 'locale')
    return (
      <div className="LanguageSetting">
        <header className="LanguageSetting__title">
          {I18n.t('languageSetting')}
        </header>
        <Dropdown
          className="LanguageSetting__Dropdown"
          defaultValue={defaultValue}
          items={languages}
          onClick={this.changeLanguage}
        />
      </div>
    )
  }
}

export default LanguageSetting
