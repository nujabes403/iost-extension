import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import { connect } from 'react-redux'
import { Header } from 'components'
import Button from 'components/Button'
import NetworkSelector from 'components/NetworkSelector'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey, publickKeyToAccount } from 'utils/key'
import utils from 'utils'
import ui from 'utils/ui';
import * as accountActions from 'actions/accounts'

import './index.scss'

type Props = {

}

const getPassword = () => new Promise((resolve, reject) => {
  chrome.runtime.sendMessage({
    action: 'GET_PASSWORD',
  },(res)=> {
    if(res != ''){
      resolve(res)
    }else {
      reject('no password')
    }
  })
})

const getAccounts = () => new Promise((resolve, reject) => {
  chrome.storage.local.get(['accounts'], ({accounts}) => {
    resolve(accounts || [])
  })
})


class AccountImport extends Component<Props> {
  componentDidMount() {
    console.log(this.props.locationList)
  }
  state = {
    privateKey: '',
    errorMessage: '',
  }

  onSubmit = async () => {
    const { privateKey } = this.state
    const { changeLocation } = this.props
    
    let publicKey, accounts = []
    try {
      publicKey = privateKeyToPublicKey(privateKey)

      let accounts1 = await publickKeyToAccount(publicKey, true)
      let accounts2 = await publickKeyToAccount(publicKey, false)
      
      const password = await getPassword()
      accounts1 = accounts1.map(item => {
        return {
          name: item.account_info.name,
          network: 'MAINNET',
          privateKey: utils.aesEncrypt(privateKey, password),
          publicKey: publicKey,
        }
      })
      accounts2 = accounts2.map(item => {
        return {
          name: item.account_info.name,
          network: 'TESTNET',
          privateKey: utils.aesEncrypt(privateKey, password),
          publicKey: publicKey,
        }
      })
      accounts = accounts1.concat(accounts2)
    } catch (e) {
      console.log(e)
      publicKey = ''
    }

    const invalidLoginInput = !accounts.length || !privateKey || !publicKey

    if (invalidLoginInput) {
      this.throwErrorMessage()
      return
    }

    try {
      const laccounts = await getAccounts()
      const hash = {}
      accounts = laccounts.concat(accounts).reduce((prev, next) => {
        const _h = `${next.name}_${next.network}`
        hash[_h] ? '' : hash[_h] = true && prev.push(next);
        return prev
      },[]);
      chrome.storage.local.set({accounts: accounts})
      this.props.dispatch(accountActions.setAccounts(accounts));
      chrome.storage.local.get(['activeAccount'], ({activeAccount}) => {
        if(activeAccount){
          changeLocation('/accountManage')
        }else {
          iost.rpc.blockchain.getAccountInfo(accounts[0].name)
          .then((accountInfo) => {
            if (!iost.isValidAccount(accountInfo, accounts[0].publicKey)) {
              this.throwErrorMessage()
              return
            }
            const url = accounts[0].network == 'MAINNET'?'http://api.iost.io':'http://13.52.105.102:30001';
            iost.changeNetwork(url)
            
            iost.loginAccount(accounts[0].name, accounts[0].publicKey)
            chrome.storage.local.set({ activeAccount: accounts[0] },() => {
              changeLocation('/accountManage')
            })
          })
          .catch(this.throwErrorMessage)
        }
      })
      
    } catch (e) {
      console.log(e)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorMessage: '',
    })
  }

  throwErrorMessage = () => {
    this.setState({
      errorMessage: I18n.t('invalidLoginInfo'),
    })
  }

  // 首次登陆页，或添加账号页
  backTo = () => {
    const { changeLocation, locationList } = this.props
    ui.deleteLocation()
    changeLocation(locationList[locationList.length - 1])
  }

  render() {
    const { errorMessage } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('accountImport')} onBack={this.backTo} hasSetting={false} />
        <div className="accountImport-box">
          <textarea name="privateKey" id="" className="privateKey-content" onChange={this.handleChange} />
          {/*
            <NetworkSelector
              changeLocation={this.props.changeLocation}
              className="Header__NetworkSelector"
            />
          */}
          <Button className="btn-submit" onClick={this.onSubmit}>{I18n.t('submit')}</Button>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(AccountImport)
