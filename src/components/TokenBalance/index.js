import React, { Component } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import ResourceDetail from 'components/ResourceDetail'
import LoadingImage from 'components/LoadingImage'
import iost from 'iostJS/iost'
import { GET_TOKEN_BALANCE_INTERVAL } from 'constants/token'
import iconSrc from 'constants/icon'
import utils from 'utils'

import './index.scss'
import ui from "utils/ui";

type Props = {

}

class Index extends Component<Props> {
  state = {
    amount: 0,
    isLoading: true,
  }
  _isMounted = false

  componentDidMount() {
    this._isMounted = true
    this.getData()
  }

  getData = async () => {
    while(this._isMounted){
      await this.getResourceBalance()
      await utils.delay(5000)
    }
  }

  componentWillReceiveProps(nextProps) {
    this.getResourceBalance()
  }
  

  componentWillUnmount() {
    this._isMounted = false
  }

  getTokenBalance = async () => {
    const { account, selectedTokenSymbol } = this.props
    const url = account.network == 'MAINNET'?'https://api.iost.io':'http://13.52.105.102:30001';
    iost.changeNetwork(url)
    const { balance, frozen_balances } = await iost.rpc.blockchain.getBalance(iost.account.getID(), selectedTokenSymbol)

    let frozenAmount = 0

    if (frozen_balances && frozen_balances.length !== 0) {
      frozenAmount = frozen_balances.reduce((acc, cur) => (acc += cur.amount, acc), 0)
    }

    this.setState({
      amount: balance,
      frozenAmount,
      isLoading: false,
    })
  }

  getResourceBalance = () => {
    return new Promise((resolve, reject) => {
      const { account } = this.props
      const url = account.network == 'MAINNET'?'https://api.iost.io':'http://13.52.105.102:30001';
      iost.changeNetwork(url)
      iost.rpc.blockchain.getAccountInfo(account.name)
      .then(({balance, frozen_balances, gas_info, ram_info}) => {
        const frozenAmount = frozen_balances.reduce((prev, next) => (prev += next.amount, prev), 0)
        this.setState({
          amount: balance,
          frozenAmount,
          gas: gas_info.current_total,
          gas_used: Number((gas_info.limit - gas_info.current_total).toFixed(4)),
          ram: Number((ram_info.available/1024).toFixed(4)),
          ram_used: Number((ram_info.used/1024).toFixed(4)),
          isLoading: false,
        })
        resolve()
      })
      .catch(err => {
        resolve()
      })
    })
  }

  render() {
    const { frozenAmount, amount, gas, gas_used, ram, ram_used, isLoading } = this.state
    const { selectedTokenSymbol, account, moveTo } = this.props
    const url = account?`${account.network == 'MAINNET'?'https://www.iostabc.com':'http://54.249.186.224'}/account/${account.name}`:'#'
    return (
      <div className="TokenBalance-box">
        <a target={account?"_blank":''} href={url}>
          <div className="logo-box">
            <img className="logo" src={iconSrc[selectedTokenSymbol]} />
          </div>
          <div className="TokenBalance-amount-box">
            <span className="TokenBalance__amount">{isLoading ? <LoadingImage /> : amount}</span>
            <span className="TokenBalance__symbol">{selectedTokenSymbol}</span>
            {/*(frozenAmount !== 0) && <span className="TokenBalance__frozenBalance"> (+ {frozenAmount})</span>*/}
          </div>
        </a>

        {!isLoading && (
          <div className="TokenBalance__resources">
            <p className="TokenBalance__gas" onClick={moveTo('/gasManage')}>iGAS：{parseInt(gas_used)} {I18n.t('GasManage_Lock')}/{parseInt(gas)} {I18n.t('GasManage_Available')}</p>
            <p className="TokenBalance__ram" onClick={moveTo('/ramManage')}>iRAM：{ram_used}KB {I18n.t('RamManage_Used')}/{ram}KB {I18n.t('RamManage_Remaining')}</p>
            <p className="TokenBalance__resources_manage"><a onClick={moveTo('/gasManage')}>{I18n.t('GasManage_Title')}</a><a onClick={moveTo('/ramManage')}>{I18n.t('RamManage_Title')}</a></p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  selectedTokenSymbol: state.token.selectedTokenSymbol,
})

export default connect(mapStateToProps)(Index)
