import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Button from 'components/Button'
import AskPopupSummary from './popup-summary'
import AskPopupDetail from './popup-detail'

import './popup-index.scss'

type Props = {

}

//contract method
//chrome-extension://mjkppkibbpmmkokkhgjhlipgokonagep/askTx.html?slotIdx=0&tx=%5B%22ContractEf4ztxHFP4iUs6Xpomgb2nqfJN3D9K7dfp5H7pV7BVy4%22%2C%22hello%22%2C%5B%22123%22%5D%5D

//transfer
// chrome-extension://mjkppkibbpmmkokkhgjhlipgokonagep/askTx.html?slotIdx=0&tx=%5B%22token.iost%22%2C%22transfer%22%2C%5B%22iost%22%2C%22testnetiost%22%2C%22testiost1%22%2C%221.000%22%2C%22%22%5D%5D

class AskPopup extends Component<Props> {
  constructor() {
    super()
    this.state = {
      
    }
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

  componentDidMount() {
    // chrome.windows.onRemoved.addListener((integer windowId) => {
    //   chrome.runtime.sendMessage({
    //     action: 'TX_CANCEL',
    //     payload: {
    //       slotIdx: this.slotIdx,
    //     }
    //   })
    // });
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
    //transfer
    return (
      <div className="AskPopup">
        <header className="AskPopup__header">
          <p className="title">Transfer</p>
          <p><span>{contractAddress}</span><span>-></span><span>{abi}</span></p>
        </header>
        <div className="AskPopup__container">
          {abi == 'transfer'?
          <TransferDetail 
          args={args}
          />:<ContractDetail 
          accountId={this.accountId}
          args={args}
          />}
          {/*
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
          */}
          <p className="AskPopup__tip">* 账户授权并不会共享您的私钥</p>
          <p className="AskPopup__tip">* 当前应用为第三方开发，请注意甄别</p>
          <div className="AskPopup__buttons">
            <button
              className="cancel"
              onClick={this.cancelTx}
            >
              CANCEL
            </button>
            <button
              className="confirm"
              onClick={this.confirmTx}
            >
              CONFIRM
            </button>
          </div>
        </div>
        
      </div>
    )
  }
}

const ContractDetail = ({args, accountId}) => {
  return (
    <div className="AskPopup__detail">
      <span className="title">Account</span>
      <p>{accountId}</p>
      <span className="title">Memo</span>
      <p className="memo">{args.join(', ')}</p>
    </div>
  )
}

const TransferDetail = ({args}) => {
  const [symbol, _from, to, amount, memo] = args
  return (
    <div className="AskPopup__detail">
      <span className="title">From</span>
      <p>{_from}</p>
      <span className="title">To</span>
      <p>{to}</p>
      <span className="title">Amount</span>
      <p className="amount">{`${amount} ${symbol}`}</p>
      <span className="title">Memo</span>
      <p className="memo">{memo}</p>
    </div>
  )
}









ReactDOM.render(<AskPopup />, document.getElementById('root'))
