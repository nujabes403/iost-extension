import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import { Header } from 'components'
import classnames from 'classnames'
import './index.scss'
import ui from "utils/ui";

const accountArr = [
  { id: 1, test: true, account: 'wwwmmmwwwmmm', privateKey: '********' },
  { id: 2, test: false, account: 'gicinbigien', privateKey: '********' },
]

class AccountManage extends Component<Props> {
  componentDidMount() {
    console.log(this.props.locationList)
  }
  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  backTo = () => {
    const { changeLocation, locationList } = this.props
    ui.deleteLocation()
    changeLocation(locationList[locationList.length - 1])
  }

  render() {
    return (
      <Fragment>
        <Header title={I18n.t('accountManage')} onBack={this.backTo} onAdd={this.moveTo('/accountAdd')} setting={false} />
        <div className="accountManage-box">
          {
            accountArr.map((item) =>
              <div className="account-item" key={item.id}>
                <div className="left">
                  <div className="account-name-box">
                    <span className={classnames('account-title', item.test ? 'test' : '')}>{item.test ? I18n.t('test') : I18n.t('official')}</span>
                    <span className="account-name">{item.account}</span>
                  </div>
                  <div className="privateKey-box">
                    <span className="privateKey-title">{I18n.t('privateKey')}</span>
                    <span className="privateKey-name">
                      <span>{item.privateKey}</span>
                      <i className="copy" />
                    </span>
                  </div>
                </div>
                <i className="right" />
              </div>
            )
          }
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(AccountManage)
