import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { Login, Account, AccountImport, AccountManage, TokenTransfer, AccountQRCode,
  AccountCreateStep1, AccountCreateStep2, AccountCreateStep3, AccountSetting, ChangePwd,
  Lock, AccountAdd, ChangeLanguage, IostWallet, UserAgreement
} from 'components'
import Settings from 'components/Settings'
import Popup from 'components/Popup'

import iost from 'iostJS/iost'
import utils from 'utils'
import * as accountActions from 'actions/accounts'
import './App.scss'

const getPassword = () => new Promise((resolve, reject) => {
  chrome.runtime.sendMessage({
    action: 'GET_PASSWORD',
  },(res)=> {
    if(res != ''){
      resolve(res)
    }else {
      reject('no password')
    }
  })
})

type Props = {
  isLoading: boolean,
  children: React.DOM,
}
// /var/www/iost-helloworld-dapp/dist
class App extends Component<Props> {
  state = {
    isLoading: true,
    currentLocation: '/login',
    // currentLocation: '/account',
  }

  componentDidMount() {
    // chrome.storage.local.remove(['password'],({ password }) => {
    //   console.log(password)
    // })
    chrome.storage.local.get(['password'],({ password }) => {
      if(password){
        chrome.runtime.sendMessage({
          action: 'GET_UNLOCK_STATE',
        },(res)=> {
          if(res === false){
            //解锁页面
            this.changeLocation('/lock')
          }else {
            chrome.storage.local.get(['accounts'], ({accounts}) => {
              // console.log('账号列表', accounts)
              if (accounts && accounts.length){
                this.props.dispatch(accountActions.setAccounts(accounts));
                chrome.storage.local.get(['activeAccount'], ({activeAccount}) => {
                  console.log('当前账号', activeAccount)
                  const account = activeAccount || accounts[0]
                  const { name, privateKey } = account
                  chrome.runtime.sendMessage({
                    action: 'GET_PASSWORD',
                  },(res)=> {
                    const encodedPrivateKey = utils.aesDecrypt(privateKey,res)
                    const url = account.network == 'MAINNET'?'http://api.iost.io':'http://13.52.105.102:30001';
                    iost.changeNetwork(url)
                    iost.loginAccount(name, encodedPrivateKey)
                    chrome.storage.local.set({ activeAccount: account },() => {
                      this.changeLocation('/account')
                    })
                  })
                })
              }else {
                this.changeLocation('/accountImport')
              }
            })
          }
        })
      }else {
        this.changeLocation('/login')
      }
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
      case '/changeLanguage':
        return <ChangeLanguage changeLocation={this.changeLocation} />
      case '/iostWallet':
        return <IostWallet changeLocation={this.changeLocation} />
      case '/userAgreement':
        return <UserAgreement changeLocation={this.changeLocation} />
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderComponentByLocation()}
        {/*这个是新的全屏弹窗容器*/}
        <Popup />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
})

export default connect(mapStateToProps)(App)
