import React, { Component, Fragment } from 'react'
import { I18n } from 'react-redux-i18n'
import { connect } from 'react-redux'
import Input from 'components/Input'
import { Header } from 'components'
import Button from 'components/Button'
import NetworkSelector from 'components/NetworkSelector'
import iost from 'iostJS/iost'
import { privateKeyToPublicKey, publickKeyToAccount } from 'utils/key'
import utils from 'utils'

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
      },[])
      chrome.storage.local.set({accounts: accounts})
      this.props.dispatch(accountActions.setAccounts(accounts));
      iost.rpc.blockchain.getAccountInfo(accounts[0].name)
          .then((accountInfo) => {
            if (!iost.isValidAccount(accountInfo, publicKey)) {
              this.throwErrorMessage()
              return
            }

            iost.loginAccount(accounts[0].name, privateKey)
            changeLocation('/accountManage')
          })
          .catch(this.throwErrorMessage)
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

  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  render() {
    const { errorMessage } = this.state
    return (
      <Fragment>
        <Header title={I18n.t('accountImport')} onBack={this.moveTo('/login')} />
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
})

export default connect(mapStateToProps)(AccountImport)
