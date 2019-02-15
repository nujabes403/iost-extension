import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'
import cx from 'classnames'

import './TokenTransferFailed.scss'

type Props = {

}

class TokenTransferFailed extends Component<Props> {
  render() {
    const { tx, className } = this.props

    return (
      <div className={cx('TokenTransferFailed', className)}>
        <header className="TokenTransferFailed__title">{I18n.t('transactionFailure')}</header>
        <p className="TokenTransferFailed__item">
          <p>{I18n.t('txid')}:</p>
          <p className="TokenTransferFailed__item--txhash">{tx.tx_hash}</p>
        </p>
        <p className="TokenTransferFailed__item">
          {I18n.t('gasUsage')}: {tx.gas_usage}
        </p>
        {tx.message && (
          <p className="TokenTransferFailed__item TokenTransferFailed__item--message">
            {I18n.t('message')}: {tx.message} (status code: {tx.status_code})
          </p>
        )}
        {tx.ram_usage && Object.keys(tx.ram_usage).length !== 0 && (
          <p className="TokenTransferFailed__item">
            {I18n.t('ramUsage')}: {Object.values(tx.ram_usage).map(a => <p>{a}</p>)}
          </p>
        )}
      </div>
    )
  }
}

export default TokenTransferFailed
