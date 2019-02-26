import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import i18n from './i18n'
import AskPopupSummary from './popup-summary'
import AskPopupDetail from './popup-detail'
const transLocal = (lan, name) => {
  return i18n[lan][name]
}
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
      lan: 'en'
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
    chrome.storage.local.get(['locale'], (result) => {
      this.setState({
        lan: result.locale
      })
    })
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

  onTransLocal = (name) => {
    return transLocal(this.state.lan, name)
  }

  render() {
    const [contractAddress, abi, args = []] = this.txInfo
    return (
      <div className="AskPopup">
        <header className="AskPopup__header">
          <p className="title">{abi == 'transfer' ? this.onTransLocal('Dapp_Signature') : this.onTransLocal('Dapp_Authorization')}</p>
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
          <p className="AskPopup__tip">{this.onTransLocal('Dapp_Tip1')}</p>
          <p className="AskPopup__tip">{this.onTransLocal('Dapp_Tip2')}</p>
          <div className="AskPopup__buttons">
            <button
              className="cancel"
              onClick={this.cancelTx}
            >
              {this.onTransLocal('Dapp_Cancel')}
            </button>
            <button
              className="confirm"
              onClick={this.confirmTx}
            >
              {this.onTransLocal('Dapp_Confirm')}
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
