import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import cx from 'classnames'
import iost from 'iostJS/iost'
import { Header, TokenBalance } from 'components'
import Button from 'components/Button'
import ui from 'utils/ui'
import * as accountActions from 'actions/accounts';
import { privateKeyToPublicKey, publickKeyToAccount } from 'utils/key'
import utils from 'utils';
import './index.scss'
import bs58 from 'bs58'
const dealList = [
  {id: 1, time: '02/01/2019 11:23:33', transferTo: 'sdingidngmie', status: 0, account: -233 },
  {id: 2, time: '02/01/2019 11:23:33', transferTo: 'sdingidngmie', status: 1, account: -233 },
  {id: 3, time: '02/01/2019 11:23:33', transferTo: 'sdingidngmie', status: 2, account: -233 },
  {id: 4, time: '02/01/2019 11:23:33', transferTo: 'sdingidngmie', status: 0, account: -233 },
  {id: 5, time: '02/01/2019 11:23:33', transferTo: 'sdingidngmie', status: 1, account: -233 },
  {id: 6, time: '02/01/2019 11:23:33', transferTo: 'sdingidngmie', status: 2, account: -233 }
]

type Props = {

}

const Algorithm = {
  Ed25519: 2,
  Secp256k1: 1,
};

class Account extends Component<Props> {
  state = {
    loading: true,
    isShowAccountList: false,
    currentAccount: {},
  }

  componentDidMount() {

   console.log(iost)
    chrome.storage.local.get(['accounts'], ({accounts}) => {
      if (accounts && accounts.length){
        this.props.dispatch(accountActions.setAccounts(accounts));
        chrome.storage.local.get(['activeAccount'], ({activeAccount}) => {
          const account = activeAccount || accounts[0]
          const { name, privateKey } = activeAccount
          chrome.runtime.sendMessage({
            action: 'GET_PASSWORD',
          },(res)=> {
            const encodedPrivateKey = utils.aesDecrypt(privateKey,res)
            iost.loginAccount(name, encodedPrivateKey)
            chrome.storage.local.set({ activeAccount: account })
            this.setState({
              loading: false,
              currentAccount: account,
            })
          })

        })
      }else {
        this.changeLocation('/accountImport')
      }
    })
  }

  logout = () => {
    const { changeLocation } = this.props
    iost.logoutAccount()
    changeLocation('/login')
  }

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    ui.settingLocation(location)
    changeLocation(location)
  }

  toggleAccountList = () => {
    this.setState({
      isShowAccountList: !this.state.isShowAccountList,
    })
  }

  chooseAccount = (account) => () => {
    const { name, privateKey, publicKey, network } = account
    
    chrome.runtime.sendMessage({
      action: 'GET_PASSWORD',
    },(res)=> {
      const encodedPrivateKey = utils.aesDecrypt(privateKey, res)
      const url = account.network == 'MAINNET'?'https://api.iost.io':'http://13.52.105.102:30001';
      iost.changeNetwork(url)
      iost.loginAccount(name, encodedPrivateKey)
      this.setState({
        currentAccount: account,
      })
      chrome.storage.local.set({ 'activeAccount': account }, () => {
        console.log('switch account')
        this.toggleAccountList()
      })
    })
  }

  render() {
    const { isShowAccountList, currentAccount, loading } = this.state
    const { accounts } = this.props
    if(loading) return <div></div>
    return (
      <Fragment>
        <Header onSetting={this.moveTo('/accountSetting')} logo={true}>
          <div className="account-currentName-box" onClick={this.toggleAccountList}>
            <i className={cx('circle', currentAccount.network != 'MAINNET' ? 'test' : '')} />
            <span className="account-name">{currentAccount.name}</span>
            <i className={cx('arrow', accounts.length <=1 ? 'arrow-hide' : (isShowAccountList ? 'arrow-down' : 'arrow-right'))}
                />
          </div>
        </Header>
        <div className="account-box">
          <div className={cx('nameList-box', isShowAccountList ? 'show' : '')}>
            <ul className="accountName-list">
              {
                accounts.map((item) =>
                  <li key={item.name + '_' + item.network} onClick={this.chooseAccount(item)}>
                    {/*<i className={cx('circle', item.network != 'MAINNET' ? 'test' : '')} />*/}
                    <span className={cx('account-title', item.network != 'MAINNET' ? 'test' : '')}>{item.network != 'MAINNET' ? I18n.t('ManageAccount_Test') : I18n.t('ManageAccount_Official')}</span>
                    <span className="account-name">{item.name}</span>
                    <i className={cx('check', ((item.name + '_' + item.network) == (currentAccount.name + '_' + currentAccount.network)) ? 'checked' : '')} />
                  </li>)
              }
            </ul>
          </div>
          <TokenBalance account={currentAccount} moveTo={this.moveTo}/>
          <div className="btn-box">
            <Button
              className="btn-transfer"
              account
              onClick={this.moveTo('/tokenTransfer')}
            >
              {I18n.t('Account_Transfer')}
            </Button>
            <Button
              className="btn-receipt"
              account
              onClick={this.moveTo('/accountQRCode')}
            >
              {I18n.t('Account_Receive')}
            </Button>
          </div>

          <div className="dealRecord-box">
            <div className="title-box">
              <div className="line"></div>
              <span className="title">{I18n.t('dealRecord')}</span>
              <div className="line"></div>
            </div>
            <div className="list-box">
              {
                dealList.map((item) =>
                  <div className="item-box" key={item.id}>
                    <div className="left">
                      <span className="time">{item.time}</span>
                      <span className="transferTo">{I18n.t('transferTo', { name: item.transferTo })}</span>
                    </div>
                    <div className="right">
                      <span className={cx('status', item.status == 0 ? 'confirmed' : (item.status == 1 ? 'notApproved' : 'failure'))}>
                        {item.status == 0 ? I18n.t('confirmed') : (item.status == 1 ? I18n.t('notApproved') : I18n.t('failure'))}
                      </span>
                      <span className="account">{item.account} IOST</span>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(Account)
