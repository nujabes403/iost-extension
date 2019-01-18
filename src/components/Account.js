import React, { Component } from 'react'

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

  render() {
    return (
      <div className="Account">
        <div className="Account__header">
          <p className="Account__headerTitle">Account</p>
          <p className="Account__accountName">{iost.account.getID()}</p>
          <Button
            className="Account__logoutButton"
            onClick={this.logout}
          >
            Logout
          </Button>
        </div>
        <TokenBalance symbol="iost" />
        <div className="Account__buttons">
          <Button
            className="Account__button"
            blue
            onClick={() => ui.openPopup({ content: (
              <TokenTransfer
                symbol="iost"
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
