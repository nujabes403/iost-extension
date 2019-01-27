import React, { Component } from 'react'
import cx from 'classnames'

import './TokenTransferFailed.scss'

type Props = {

}

class TokenTransferFailed extends Component<Props> {
  render() {
    const { tx, className } = this.props

    return (
      <div className={cx('TokenTransferFailed', className)}>
        <header className="TokenTransferFailed__title">Transaction failure</header>
        <p className="TokenTransferFailed__item">
          <p>TXID:</p>
          <p className="TokenTransferFailed__item--txhash">{tx.tx_hash}</p>
        </p>
        <p className="TokenTransferFailed__item">
          Gas usage: {tx.gas_usage}
        </p>
        {tx.message && (
          <p className="TokenTransferFailed__item TokenTransferFailed__item--message">
            Message: {tx.message} (status code: {tx.status_code})
          </p>
        )}
        {Object.keys(tx.ram_usage).length !== 0 && (
          <p className="TokenTransferFailed__item">
            Ram usage: {Object.values(tx.ram_usage).map(a => <p>{a}</p>)}
          </p>
        )}
      </div>
    )
  }
}

export default TokenTransferFailed
