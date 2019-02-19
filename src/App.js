import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Landing from 'components/Index'
// import Index from 'components/Index'
import { Login, AccountImport, AccountManage } from 'components'
import Account from 'components/Account'
import Settings from 'components/Settings'
import Popup from 'components/Popup'

import iost from 'iostJS/iost'
import i18n from 'utils/i18n'

import './App.scss'

type Props = {
  isLoading: boolean,
  children: React.DOM,
}
// /var/www/iost-helloworld-dapp/dist
class App extends Component<Props> {
  state = {
    isLoading: true,
    // currentLocation: '/AccountImport',
    currentLocation: '/login',
    // currentLocation: '/account',
  }

  componentDidMount() {

    chrome.storage.local.get(['password'],({ password }) => {
      if(password){
        chrome.runtime.sendMessage({
          action: 'GET_UNLOCK_STATE',
        },(res)=> {
          if(res === false){
            //解锁页面
            // this.changeLocation('/AccountImport')
          }else {
            this.changeLocation('/AccountImport')
            // chrome.storage.sync.get(['activeAccount'], (result) => {
            //   const activeAccount = result && result.activeAccount
            //   if (!activeAccount) return

            //   const { id, encodedPrivateKey } = activeAccount
            //   iost.loginAccount(id, encodedPrivateKey)
            //   this.changeLocation('/account')
            // })
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
      case '/AccountImport':
        return <AccountImport changeLocation={this.changeLocation} />
      case '/AccountManage':
        return <AccountManage changeLocation={this.changeLocation} />
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
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
})

export default connect(mapStateToProps)(App)
