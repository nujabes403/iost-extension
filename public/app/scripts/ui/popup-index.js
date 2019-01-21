import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Button from 'components/Button'
import AskPopupSummary from './popup-summary'
import AskPopupDetail from './popup-detail'

import './popup-index.scss'

type Props = {

}

class AskPopup extends Component<Props> {
  constructor() {
    super()
    window.location.search
      .replace('?', '')
      .split('&')
      .forEach(a => {
        const [key, value] = a.split('=')
        this[key] = value
      }) // this.slotIdx, this.tx
    try {
      this.txInfo = JSON.parse(decodeURIComponent(this.tx))
    } catch (e) {
      console.log(e)
      this.txInfo = []
    }
  }

  confirmTx = () => {
    chrome.runtime.sendMessage({
      action: 'TX_CONFIRM',
      payload: {
        slotIdx: this.slotIdx,
      }
    })
    window.close()
  }

  cancelTx = () => {
    chrome.runtime.sendMessage({
      action: 'TX_CANCEL',
      payload: {
        slotIdx: this.slotIdx,
      }
    })
    window.close()
  }

  render() {
    const [contractAddress, abi, args = []] = this.txInfo
    return (
      <div className="AskPopup">
        <header className="AskPopup__title">Transaction Detail</header>
        <AskPopupDetail
          contractAddress={contractAddress}
          abi={abi}
          args={args}
        />
        <AskPopupSummary
          contractAddress={contractAddress}
          abi={abi}
          args={args}
        />
        <p className="AskPopup__confirmMessage">Are you sure to confirm this transaction?</p>
        <Button
          className="AskPopup__button AskPopup__button--confirm"
          onClick={this.confirmTx}
        >
          CONFIRM
        </Button>
        <Button
          className="AskPopup__button AskPopup__button--cancel"
          onClick={this.cancelTx}
        >
          CANCEL
        </Button>
      </div>
    )
  }
}

ReactDOM.render(<AskPopup />, document.getElementById('root'))
