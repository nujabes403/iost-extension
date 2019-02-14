import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Header from 'components/Header'
import Landing from 'components/Landing'
import Login from 'components/Login'
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

class App extends Component<Props> {
  state = {
    isLoading: true,
    currentLocation: '/login',
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
    }
  }

  componentDidMount() {
    chrome.storage.sync.get(['activeAccount'], (result) => {

      const activeAccount = result && result.activeAccount
      if (!activeAccount) return

      const { id, encodedPrivateKey } = activeAccount
      iost.loginAccount(id, encodedPrivateKey)
      this.changeLocation('/account')
    })
  }

  render() {
    const { currentLocation } = this.state
    const { children, ui } = this.props

    return (
      <div className="App">
        <Header changeLocation={this.changeLocation} />
        <div className="App__content">
          {this.renderComponentByLocation()}
          <Popup />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  locale: state.i18n.locale,
})

export default connect(mapStateToProps)(App)
