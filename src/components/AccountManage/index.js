import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import { Header } from 'components'
import classnames from 'classnames'
import { connect } from 'react-redux'
import * as accountActions from 'actions/accounts'
import './index.scss'

class AccountManage extends Component<Props> {

  componentDidMount() {
   
  }
  
  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  render() {
    const { accounts } = this.props
    return (
      <Fragment>
        <Header title={I18n.t('accountManage')} onBack={this.moveTo('/accountSetting')} onAdd={this.moveTo('/accountAdd')} setting={false} />
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
  accounts: state.accounts.accounts,
})

export default connect(mapStateToProps)(AccountManage)

