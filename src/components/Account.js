import React, { Component } from 'react'
import cx from 'classnames'

import iost from 'iostJS/iost'
import Button from 'components/Button'
import TokenBalance from 'components/TokenBalance'
import TokenTransfer from 'components/TokenTransfer'
import TokenSelector from 'components/TokenSelector'
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
          <p className="Account__headerTitle">Account</p>
          <p className="Account__accountName">{iost.account.getID()}</p>
          <Button
            className={cx('Account__controlButton', 'Account__controlButton--setting')}
            onClick={this.moveToSetting}
          >
            Settings
          </Button>
          <Button
            className={cx('Account__controlButton', 'Account__controlButton--logout')}
            onClick={this.logout}
          >
            Logout
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
            Transfer
          </Button>
          <Button
            className="Account__button"
            blue
            onClick={() => ui.openPopup({ content: <TokenSelector /> })}
          >
            Select Another Token
          </Button>
        </div>
      </div>
    )
  }
}

export default Account
