import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import { Header, Modal } from 'components'
import classnames from 'classnames'
import * as accountActions from 'actions/accounts'
import ui from 'utils/ui';
import './index.scss'


const { Modal1 } = Modal


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

  deleteAccount = () => {
    ui.toggleModal()
  }
  render() {
    const { accounts } = this.props
    return (
      <Fragment>
        <Header title={I18n.t('accountManage')} onBack={this.backTo} onAdd={this.moveTo('/accountAdd')} setting={false} />
        <div className="accountManage-box">
          {
            accounts.map((item) =>
              <div className="account-item" key={item.name + '_' + item.network}>
                <div className="left">
                  <div className="account-name-box">
                    <span className={classnames('account-title', item.network != 'MAINNET' ? 'test' : '')}>{item.network != 'MAINNET' ? I18n.t('test') : I18n.t('official')}</span>
                    <span className="account-name">{item.name}</span>
                  </div>
                  <div className="privateKey-box">
                    <span className="privateKey-title">{I18n.t('publicKey')}</span>
                    <span className="privateKey-name">
                      <span>********</span>
                      <i className="copy" />
                    </span>
                  </div>
                </div>
                <i className="right" onClick={this.deleteAccount} />
              </div>
            )
          }
        </div>
        <Modal1 />
      </Fragment>
    )
  }
}


const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(AccountManage)

