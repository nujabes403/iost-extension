import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'
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
        <header className="TokenTransferSuccess__title">{I18n.t('transactionReceipt')}</header>
        <p className="TokenTransferSuccess__item">
          <p>{I18n.t('txid')}:</p>
          <p className="TokenTransferSuccess__item--txhash">{tx.tx_hash}</p>
        </p>
        <p className="TokenTransferSuccess__item">
          {I18n.t('gasUsage')}: {tx.gas_usage}
        </p>
        {tx.message && (
          <p className="TokenTransferSuccess__item">
            {I18n.t('message')}: {tx.message}
          </p>
        )}
        {Object.keys(tx.ram_usage).length !== 0 && (
          <p className="TokenTransferSuccess__item">
            {I18n.t('ramUsage')}: {Object.values(tx.ram_usage).map(a => <p>{a}</p>)}
          </p>
        )}
        {receipt && (
          <div className="TokenTransferSuccess__receipt">
            <p className="TokenTransferSuccess__item">{I18n.t('receiptToken')}: {receiptContent[0]}</p>
            <p className="TokenTransferSuccess__item">{I18n.t('receiptSender')}: {receiptContent[1]}</p>
            <p className="TokenTransferSuccess__item">{I18n.t('receiptReceiver')}: {receiptContent[2]}</p>
            <p className="TokenTransferSuccess__item">{I18n.t('receiptAmount')}: {receiptContent[3]}</p>
            <p className="TokenTransferSuccess__item">{I18n.t('receiptMemo')}: {receiptContent[4]}</p>
            <p className="TokenTransferSuccess__item">{I18n.t('receiptContractFunctionName')}: {receipt.func_name}</p>
          </div>
        )}
      </div>
    )
  }
}

export default TokenTransferSuccess
