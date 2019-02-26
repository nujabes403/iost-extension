import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'

import { Header } from 'components'
import i18n from 'utils/i18n'

import './index.scss'

const settingList = [
  { id: 1, name: 'china', lan: '中文' },
  { id: 2, name: 'english', lan: 'english' },
  { id: 3, name: 'korea', lan: '한국어' },
]
type Props = {

}

class ChangeLanguage extends Component<Props> {
  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  changeLanguage = (name) => () => {
    if (name == 'china') {
      i18n.setLocale('zh')
    } else if (name == 'english') {
      i18n.setLocale('en')
    } else if (name == 'korea') {
      i18n.setLocale('ko')
    }
    this.moveTo('/accountSetting')()
  }

  render() {
    return (
      <Fragment>
        <Header title={I18n.t('Settings_changeLanguage')} onBack={this.moveTo('/accountSetting')} hasSetting={false} />
        <div className="changeLanguage-box">
          <ul>
            {
              settingList.map((item) =>
                <li onClick={this.changeLanguage(item.name)} key={item.id}>
                  <i className={item.name} />
                  {/*<span className="name">{I18n.t(`ChangeLanguage_${item.name}`)}</span>*/}
                  <span className="name">{item.lan}</span>
                </li>
              )
            }
          </ul>
        </div>
      </Fragment>
    )
  }
}

export default ChangeLanguage
