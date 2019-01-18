import React, { Component, Fragment } from 'react'
import cx from 'classnames'

import iost from 'iostJS/iost'
import Input from 'components/Input'
import Button from 'components/Button'
import TokenBalance from 'components/TokenBalance'

import './TokenTransfer.scss'

type Props = {

}

class TokenTransfer extends Component<Props> {
  state = {
    symbol: 'iost',
    to: '',
    amount: '',
    isSending: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  transfer = () => {
    const { to, amount } = this.state
    const { symbol } = this.props
    const accountName = iost.account.getID()
    // 1. Create transfer tx
    const tx = iost.iost.transfer(symbol, accountName, to, amount)

    // 2. Sign on transfer tx
    iost.account.signTx(tx)

    // 3. Handle transfer tx
    const handler = new iost.pack.TxHandler(tx, iost.rpc)

    this.setState({ isSending: true })
    handler
      .onSuccess(async (response) => {
        console.log(response, 'success response')
        const afterBalance = await iost.rpc.blockchain.getBalance(accountName, symbol)
        this.setState({
          isSending: false,
        })
      })
      .onFailed((err) => {
        console.log(err, 'err')
        this.setState({
          isSending: false,
        })
      })
      .send()
      .listen(1000, 15)
  }

  render() {
    const { isSending } = this.state
    const { className } = this.props
    return (
      <Fragment>
        <TokenBalance symbol="iost" />
        <div className={cx('TokenTransfer', className)}>
          <header className="TokenTransfer__title">Send IOST</header>
          <label className="TokenTransfer__InputLabel">FROM: </label>
          <Input
            className="TokenTransfer__Input"
            value={iost.account.getID()}
          />
          <label className="TokenTransfer__InputLabel">TO: </label>
          <Input
            name="to"
            onChange={this.handleChange}
            className="TokenTransfer__Input"
          />
          <label className="TokenTransfer__InputLabel">AMOUNT: </label>
          <Input
            name="amount"
            onChange={this.handleChange}
            className="TokenTransfer__Input"
          />
          <Button
            className="TokenTransfer__sendButton"
            onClick={this.transfer}
            isLoading={isSending}
          >
            SEND
          </Button>
        </div>
      </Fragment>
    )
  }
}

export default TokenTransfer
