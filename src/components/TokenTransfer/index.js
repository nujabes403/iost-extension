import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import cx from 'classnames'

import iost from 'iostJS/iost'
import { Header } from 'components'
import Input from 'components/Input'
import Button from 'components/Button'
// import TokenBalance from 'components/TokenBalance'
import { GET_TOKEN_BALANCE_INTERVAL } from 'constants/token'
import TokenTransferSuccess from 'components/TokenTransferSuccess'
import TokenTransferFailed from 'components/TokenTransferFailed'
import ui from 'utils/ui'


import './index.scss'

const defaultConfig = {
  gasRatio: 1,
  gasLimit: 2000000,
  delay: 0,
  expiration: 90,
  defaultLimit: "unlimited"
}

type Props = {

}

class Index extends Component<Props> {
  state = {
    to: '',
    amount: 0,
    isSending: false,
    iGASPrice: defaultConfig.gasRatio,
    iGASLimit: defaultConfig.gasLimit,
    errorMessage: '',
    isShowing: false, // 是否显示多余资源输入框

  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      this.getTokenBalance()
      this.getResourceBalance()
    }, GET_TOKEN_BALANCE_INTERVAL)
  }

  getTokenBalance = async () => {
    const { selectedTokenSymbol } = this.props
    const { balance, frozen_balances } = await iost.rpc.blockchain.getBalance(iost.account.getID(), selectedTokenSymbol)

    let frozenAmount = 0

    if (frozen_balances && frozen_balances.length !== 0) {
      frozenAmount = frozen_balances.reduce((acc, cur) => (acc += cur.amount, acc), 0)
    }

    this.setState({
      balance: balance,
      frozenAmount,
      isLoading: false,
    })
  }

  getResourceBalance = async () => {
    const accountInfo = await iost.rpc.blockchain.getAccountInfo(iost.account.getID())
    this.setState({
      accountInfo,
      gas: accountInfo.gas_info && accountInfo.gas_info.current_total,
      ram: accountInfo.ram_info && accountInfo.ram_info.available,
      isLoading: false,
    })
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
    if(iost.rpc.getProvider()._host.indexOf('//api.iost.io') < 0){
      tx.setChainID(1023)
    }
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
    let intervalID
    handler
      .onPending(async (res) => {
        intervalID = setInterval(async() => {
          const tx = await iost.rpc.transaction.getTxByHash(res.hash)
        }, 1000)
      })
      .onSuccess(async (response) => {
        clearInterval(intervalID)
        this.setState({ isSending: false })
        ui.openPopup({
          content: <TokenTransferSuccess tx={response} />
        })
      })
      .onFailed((err) => {
        clearInterval(intervalID)
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
      .listen(1000, 60)
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  toggleMenu = () => {
    this.setState({
      isShowing: !this.state.isShowing,
    })
  }

  render() {
    const { isSending, iGASPrice, iGASLimit, errorMessage, isShowing, balance } = this.state
    const { className, selectedTokenSymbol } = this.props
    return (
      <Fragment>
        <Header title={I18n.t('transfer')} onBack={this.moveTo('/account')} />
        <div className="tokenTransfer-box">
          <div className="transferAmount-box">
            <span className="transferAmount">{I18n.t('transferAmount')}</span>
            <span className="balance">{I18n.t('balance', { num: balance, token: selectedTokenSymbol })}</span>
          </div>
          <Input
            name="amount"
            onChange={this.handleChange}
            placeholder={I18n.t('enterAmount')}
            className="input"
          />
          <label className="label">
            {I18n.t('addressCollection')}
          </label>
          <Input
            name="to"
            onChange={this.handleChange}
            placeholder={I18n.t('address')}
            className="input"
          />
          <label className="label">
            {I18n.t('remarks')}
          </label>
          <Input
            name=""
            onChange={this.handleChange}
            placeholder={I18n.t('optional')}
            className="input"
          />

          <div className="transferAmount-box">
            <span className="transferAmount">{I18n.t('resourceCost')}</span>
            <span className="iGAS-price" onClick={this.toggleMenu}>{iGASPrice} {I18n.t('iGAS')} <i /></span>
          </div>
          {
            isShowing && (
              <div>
                <Input
                  name="iGASPrice"
                  value={iGASPrice}
                  onChange={this.handleChange}
                  className="input"
                />
                <Input
                  name="iGASLimit"
                  value={iGASLimit}
                  onChange={this.handleChange}
                  className={cx('input', 'iGASLimit')}
                />
              </div>
            )
          }
          <Button
            className="btn-submit"
            onClick={this.transfer}
            isLoading={isSending}
          >
            {I18n.t('submit')}
          </Button>
          <p className="transferTips">{I18n.t('transferTips')}</p>
          <p className="TokenTransfer__errorMessage">{errorMessage}</p>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedTokenSymbol: state.token.selectedTokenSymbol,
})

export default connect(mapStateToProps)(Index)
