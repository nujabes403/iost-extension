import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'
import cx from 'classnames'

import './TransactionSuccess.scss'

type Props = {

}

class TransactionSuccess extends Component<Props> {
  render() {
    const { tx, className } = this.props
    const receipt = tx.receipts[tx.receipts.length - 1]
    const receiptContent = JSON.parse(receipt.content)

    return (
      <div className={cx('TransactionSuccess', className)}>
        <header className="TransactionSuccess__title">{I18n.t('transactionReceipt')}</header>
        <p className="TransactionSuccess__item">
          <p>{I18n.t('txid')}:</p>
          <p className="TransactionSuccess__item--txhash">{tx.tx_hash}</p>
        </p>
        <p className="TransactionSuccess__item">
          {I18n.t('gasUsage')}: {tx.gas_usage}
        </p>
        {tx.message && (
          <p className="TransactionSuccess__item">
            {I18n.t('message')}: {tx.message}
          </p>
        )}
        {Object.keys(tx.ram_usage).length !== 0 && (
          <p className="TransactionSuccess__item">
            {I18n.t('ramUsage')}: {Object.values(tx.ram_usage).map(a => <p>{a}</p>)}
          </p>
        )}
        {receipt && (
          <div className="TransactionSuccess__receipt">
            <p className="TransactionSuccess__item">{I18n.t('receiptAmount')}: {receiptContent[3]}</p>
            <p className="TransactionSuccess__item">{I18n.t('receiptContractFunctionName')}: {receipt.func_name}</p>
          </div>
        )}
      </div>
    )
  }
}

export default TransactionSuccess
