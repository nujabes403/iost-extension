import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import Header from 'components/Header'
import Landing from 'components/Landing'
import Login from 'components/Login'
import Account from 'components/Account'
import Popup from 'components/Popup'

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
    }
  }

  render() {
    const { currentLocation } = this.state
    const { children, ui } = this.props

    return (
      <div className="App">
        <Header />
        <div className="App__content">
          {this.renderComponentByLocation()}
          <Popup />
        </div>
      </div>
    )
  }
}

export default App
