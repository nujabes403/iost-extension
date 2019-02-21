import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import { Header } from 'components'
import ui from 'utils/ui';
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
  componentDidMount() {
    console.log(this.props.locationList)
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    ui.settingLocation(location)
    changeLocation(location)
  }

  backTo = () => {
    const { changeLocation, locationList } = this.props
    ui.deleteLocation()
    console.log(locationList)
    changeLocation(locationList[locationList.length - 1])
  }

  render() {
    return (
      <Fragment>
        <Header title={I18n.t('setting')} onBack={this.moveTo('/account')} hasSetting={false} />
        <div className="accountSetting-box">
          <ul>
            {
              settingList.map((item) =>
                <li onClick={this.moveTo(`/${item.name}`)} key={item.id}>
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

const mapStateToProps = (state) => ({
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(AccountSetting)
