import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'
import cx from 'classnames'

import iost from 'iostJS/iost'
import Button from 'components/Button'
import TokenBalance from 'components/TokenBalance'
import TokenTransfer from 'components/TokenTransfer'
import TokenSelector from 'components/TokenSelector'
import AccountQRCode from 'components/AccountQRCode'
import ui from 'utils/ui'

import './Account.scss'

type Props = {

}

class Account extends Component<Props> {
  logout = () => {
    const { changeLocation } = this.props
    iost.logoutAccount()
    changeLocation('/login')
  }

  moveToSetting = () => {
    const { changeLocation } = this.props
    changeLocation('/setting')
  }

  render() {
    return (
      <div className="Account">
        <div className="Account__header">
          <p className="Account__headerTitle">{I18n.t('account')}</p>
          <p
            className="Account__accountName"
            onClick={() => ui.openPopup({
              content: <AccountQRCode value={iost.account.getID()} />,
            })}
          >
            {iost.account.getID()}
          </p>
          <Button
            className={cx('Account__controlButton', 'Account__controlButton--setting')}
            onClick={this.moveToSetting}
          >
            {I18n.t('settings')}
          </Button>
          <Button
            className={cx('Account__controlButton', 'Account__controlButton--logout')}
            onClick={this.logout}
          >
            {I18n.t('logout')}
          </Button>
        </div>
        <TokenBalance />
        <div className="Account__buttons">
          <Button
            className="Account__button"
            blue
            onClick={() => ui.openPopup({ content: (
              <TokenTransfer
                className="Account__TokenTransfer"
              />
            )})}
          >
            {I18n.t('transfer')}
          </Button>
          <Button
            className="Account__button"
            blue
            onClick={() => ui.openPopup({ content: <TokenSelector /> })}
          >
            {I18n.t('selectAnotherToken')}
          </Button>
        </div>
      </div>
    )
  }
}

export default Account
