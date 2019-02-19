import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'

import { Header } from 'components'
import './index.scss'

const settingList = [
  { id: 1, name: 'china' },
  { id: 2, name: 'english' },
  { id: 3, name: 'japan' },
]
type Props = {

}

class ChangeLanguage extends Component<Props> {
  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  changeLanguage = () => {

  }

  render() {
    return (
      <Fragment>
        <Header title={I18n.t('changeLanguage')} onBack={this.moveTo('/accountSetting')} hasSetting={false} />
        <div className="changeLanguage-box">
          <ul>
            {
              settingList.map((item) =>
                <li onClick={this.changeLanguage} key={item.id}>
                  <i className={item.name} />
                  <span className="name">{I18n.t(item.name)}</span>
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
