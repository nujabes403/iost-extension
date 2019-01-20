import React, { Component } from 'react'
import cx from 'classnames'

import './TokenTransferSuccess.scss'

type Props = {

}

class TokenTransferSuccess extends Component<Props> {
  render() {
    const { tx, className } = this.props
    const receipt = tx.receipts[0]
    const receiptContent = JSON.parse(receipt.content)

    return (
      <div className={cx('TokenTransferSuccess', className)}>
        <header className="TokenTransferSuccess__title">Transaction receipt</header>
        <p className="TokenTransferSuccess__item">
          <p>TXID:</p>
          <p className="TokenTransferSuccess__item--txhash">{tx.tx_hash}</p>
        </p>
        <p className="TokenTransferSuccess__item">
          Gas usage: {tx.gas_usage}
        </p>
        {tx.message && (
          <p className="TokenTransferSuccess__item">
            Message: {tx.message}
          </p>
        )}
        {Object.keys(tx.ram_usage).length !== 0 && (
          <p className="TokenTransferSuccess__item">
            Ram usage: {Object.values(tx.ram_usage).map(a => <p>{a}</p>)}
          </p>
        )}
        {receipt && (
          <div className="TokenTransferSuccess__receipt">
            <p className="TokenTransferSuccess__item">Token: {receiptContent[0]}</p>
            <p className="TokenTransferSuccess__item">Sender: {receiptContent[1]}</p>
            <p className="TokenTransferSuccess__item">Receiver: {receiptContent[2]}</p>
            <p className="TokenTransferSuccess__item">Amount: {receiptContent[3]}</p>
            <p className="TokenTransferSuccess__item">Memo: {receiptContent[4]}</p>
            <p className="TokenTransferSuccess__item">Contract/function name: {receipt.func_name}</p>
          </div>
        )}
      </div>
    )
  }
}

export default TokenTransferSuccess
