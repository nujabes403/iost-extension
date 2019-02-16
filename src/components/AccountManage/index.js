import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import { Header } from 'components'
import classnames from 'classnames'
import './index.scss'

const accountArr = [
  { id: 1, test: true, account: 'wwwmmmwwwmmm', privateKey: '********' },
  { id: 2, test: false, account: 'gicinbigien', privateKey: '********' },
]

class AccountManage extends Component<Props> {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <Header title={I18n.t('accountManage')} setting={false} />
        <div className="accountManage-box">
          {
            accountArr.map((item) =>
              <div className="account-item" key={item.id}>
                <div className="left">
                  <div className="account-box">
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

export default AccountManage
