import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Landing from 'components/Index'
import { Login, Account, AccountImport, AccountManage, TokenTransfer, AccountQRCode,
  AccountCreateStep1, AccountCreateStep2, AccountCreateStep3, AccountSetting, ChangePwd, Modal,
  Lock, AccountAdd
} from 'components'
import Settings from 'components/Settings'
import Popup from 'components/Popup'

import iost from 'iostJS/iost'
import i18n from 'utils/i18n'

import './App.scss'

const { Modal1 } = Modal
type Props = {
  isLoading: boolean,
  children: React.DOM,
}

class App extends Component<Props> {
  state = {
    isLoading: true,
    currentLocation: '/accountImport',
  }

  componentDidMount() {
    // chrome.storage.sync.clear();
    // chrome.storage.sync.remove(['activeAccount'], function () {
    //   console.log('删除成功');
    // });
    console.log(ui,1)

    chrome.storage.sync.get(['activeAccount'], (result) => {
      const activeAccount = result && result.activeAccount
      if (!activeAccount) return

      const { id, encodedPrivateKey } = activeAccount
      iost.loginAccount(id, encodedPrivateKey)
      this.changeLocation('/account')
    })
  }
  changeLocation = (location) => {
    this.setState({
      currentLocation: location,
    })
  }

  renderComponentByLocation = () => {
    const { currentLocation } = this.state
    switch (currentLocation) {
      case '/login':
        return <Login changeLocation={this.changeLocation} />
      case '/account':
        return <Account changeLocation={this.changeLocation} />
      case '/setting':
        return <Settings changeLocation={this.changeLocation} />
      case '/accountImport':
        return <AccountImport changeLocation={this.changeLocation} />
      case '/accountManage':
        return <AccountManage changeLocation={this.changeLocation} />
      case '/tokenTransfer':
        return <TokenTransfer changeLocation={this.changeLocation} />
      case '/accountQRCode':
        return <AccountQRCode changeLocation={this.changeLocation} />
      case '/accountCreateStep1':
        return <AccountCreateStep1 changeLocation={this.changeLocation} />
      case '/accountCreateStep2':
        return <AccountCreateStep2 changeLocation={this.changeLocation} />
      case '/accountCreateStep3':
        return <AccountCreateStep3 changeLocation={this.changeLocation} />
      case '/accountSetting':
        return <AccountSetting changeLocation={this.changeLocation} />
      case '/changePwd':
        return <ChangePwd changeLocation={this.changeLocation} />
      case '/lock':
        return <Lock changeLocation={this.changeLocation} />
      case '/accountAdd':
        return <AccountAdd changeLocation={this.changeLocation} />
    }
  }

  render() {
    const { currentLocation } = this.state
    const { children, ui } = this.props

    return (
      <div className="App">
        {this.renderComponentByLocation()}
        {/*这个是新的全屏弹窗容器*/}
        <Popup />
        <Modal1 />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
})

export default connect(mapStateToProps)(App)
