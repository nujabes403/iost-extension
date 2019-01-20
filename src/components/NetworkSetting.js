import React, { Component } from 'react'

import Input from 'components/Input'
import Button from 'components/Button'

import './NetworkSetting.scss'

type Props = {

}

class NetworkSetting extends Component<Props> {
  state = {
    newNetworkURL: '',
    errorMessage: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: '',
    })
  }

  saveNewNetwork = () => {
    const { newNetworkURL } = this.state
    const { changeLocation } = this.props

    if (!newNetworkURL.startsWith('http')) {
      this.setState({
        errorMessage: 'Invalid url.'
      })
      return
    }

    chrome.runtime.sendMessage({
      action: 'SAVE_NEW_NETWORK',
      payload: {
        newNetworkURL,
      }
    })

    changeLocation('/account')
  }

  render() {
    const { errorMessage } = this.state
    return (
      <div className="NetworkSetting">
        <header className="NetworkSetting__title">
          Network setting
        </header>
        <p>Register new network:</p>
        <Input
          className="NetworkSetting__input"
          name="newNetworkURL"
          onChange={this.handleChange}
        />
        <Button
          className="NetworkSetting__button"
          onClick={this.saveNewNetwork}
        >
          Save
        </Button>
        {errorMessage && (
          <p className="NetworkSetting__errorMessage">{errorMessage}</p>
        )}
      </div>
    )
  }
}

export default NetworkSetting
