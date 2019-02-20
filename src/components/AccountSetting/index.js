import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'

import { Header } from 'components'
import './index.scss'

const settingList = [
  { id: 1, name: 'accountManage' },
  { id: 2, name: 'changeLanguage' },
  { id: 3, name: 'changePwd' },
  { id: 4, name: 'lock' },
  { id: 5, name: 'iostWallet' },
]
type Props = {

}

class AccountSetting extends Component<Props> {
  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  render() {
    return (
      <Fragment>
        <Header title={I18n.t('setting')} onBack={this.moveTo('/login')} hasSetting={false} />
        <div className="accountSetting-box">
          <ul>
            {
              settingList.map((item) =>
                <li onClick={this.moveTo(`/${item.name}`)}>
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

export default AccountSetting
