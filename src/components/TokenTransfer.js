import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import cx from 'classnames'

import iost from 'iostJS/iost'
import Input from 'components/Input'
import Button from 'components/Button'
import TokenBalance from 'components/TokenBalance'
import TokenTransferSuccess from 'components/TokenTransferSuccess'
import TokenTransferFailed from 'components/TokenTransferFailed'
import ui from 'utils/ui'

import './TokenTransfer.scss'

const defaultConfig = {
  gasRatio: 1,
  gasLimit: 2000000,
  delay: 0,
  expiration: 90,
  defaultLimit: "unlimited"
}

type Props = {

}

class TokenTransfer extends Component<Props> {
  state = {
    to: '',
    amount: '',
    isSending: false,
    iGASPrice: defaultConfig.gasRatio,
    iGASLimit: defaultConfig.gasLimit,
    errorMessage: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: '',
    })
  }

  transfer = () => {
    const { to, amount, iGASPrice, iGASLimit } = this.state
    const { selectedTokenSymbol } = this.props
    const accountName = iost.account.getID()
    // 1. Create transfer tx
    const tx = new iost.Tx(iGASPrice, iGASLimit, 0)
    tx.addAction(
      'token.iost',
      'transfer',
      JSON.stringify([selectedTokenSymbol, accountName, to, amount, '']),
    )
    tx.setTime(defaultConfig.expiration, defaultConfig.delay)
    tx.addApprove("*", defaultConfig.defaultLimit)

    // const tx = iost.iost.transfer(selectedTokenSymbol, accountName, to, amount)

    // 2. Sign on transfer tx
    iost.account.signTx(tx)

    // 3. Handle transfer tx
    const handler = new iost.pack.TxHandler(tx, iost.rpc)

    this.setState({ isSending: true })
    handler
      .onPending(async (res) => {
        const intervalID = setInterval(async() => {
          const tx = await iost.rpc.transaction.getTxByHash(res.hash)
        }, 1000)
      })
      .onSuccess(async (response) => {
        this.setState({
          isSending: false,
        })
        ui.openPopup({
          content: <TokenTransferSuccess tx={response} />
        })
      })
      .onFailed((err) => {
        if (typeof err === 'string') {
          this.setState({
            isSending: false,
            errorMessage: typeof err === 'string' && err,
          })
        } else {
          this.setState({
            isSending: false,
          })
          ui.openPopup({
            content: <TokenTransferFailed tx={err} />
          })
        }
      })
      .send()
      .listen(1000, 15)
  }

  render() {
    const { isSending, iGASPrice, iGASLimit, errorMessage } = this.state
    const { className, selectedTokenSymbol } = this.props
    return (
      <Fragment>
        <TokenBalance />
        <div className={cx('TokenTransfer', className)}>
          <header className="TokenTransfer__title">
            {I18n.t('sendToken', { token: selectedTokenSymbol })}
          </header>
          <label className="TokenTransfer__InputLabel">
            {I18n.t('transactionFrom')}:
          </label>
          <Input
            className="TokenTransfer__Input"
            value={iost.account.getID()}
          />
          <label className="TokenTransfer__InputLabel">
            {I18n.t('transactionTo')}:
          </label>
          <Input
            name="to"
            onChange={this.handleChange}
            className="TokenTransfer__Input"
          />
          <label className="TokenTransfer__InputLabel">
            {I18n.t('transactionAmount')}:
          </label>
          <Input
            name="amount"
            onChange={this.handleChange}
            className="TokenTransfer__Input"
          />
          <label className="TokenTransfer__InputLabel">
            {I18n.t('transactioniGasPrice')}:
          </label>
          <Input
            name="iGASPrice"
            value={iGASPrice}
            onChange={this.handleChange}
            className="TokenTransfer__Input"
          />
          <label className="TokenTransfer__InputLabel">
            {I18n.t('transactioniGasLimit')}:
          </label>
          <Input
            name="iGASLimit"
            value={iGASLimit}
            onChange={this.handleChange}
            className="TokenTransfer__Input"
          />
          <Button
            className="TokenTransfer__sendButton"
            onClick={this.transfer}
            isLoading={isSending}
          >
            {I18n.t('transactionSend')}
          </Button>
          <p className="TokenTransfer__errorMessage">{errorMessage}</p>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedTokenSymbol: state.token.selectedTokenSymbol,
})

export default connect(mapStateToProps)(TokenTransfer)
