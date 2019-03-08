import * as userActions from 'actions/user'
// const IOST = require('../../../iost.js')
import store from '../store'
const IOST = require('iost')
const bs58 = require('bs58')

const DEFAULT_IOST_CONFIG = {
  gasPrice: 100,
  gasLimit: 100000,
  delay: 0,
}

// const IOST_NODE_URL = 'http://localhost:30001'
const IOST_NODE_URL = 'https://api.iost.io'
const IOST_PROVIDER = new IOST.HTTPProvider(IOST_NODE_URL)

const iost = {
  pack: IOST,
  iost: new IOST.IOST(DEFAULT_IOST_CONFIG, IOST_PROVIDER),
  rpc: new IOST.RPC(IOST_PROVIDER),
  account: new IOST.Account('empty'),
  Tx: IOST.Tx,
  // network
  changeNetwork: (url) => {
    const newNetworkProvider = new IOST.HTTPProvider(url)
    iost.iost = new IOST.IOST(DEFAULT_IOST_CONFIG, newNetworkProvider)
    iost.rpc = new IOST.RPC(newNetworkProvider)
    chrome.runtime.sendMessage({
      action: 'CHANGE_NETWORK',
      payload: {
        url,
      }
    })
  },
  // account
  loginAccount: (id, encodedPrivateKey) => {
    iost.account = new IOST.Account(id)
    const kp = new IOST.KeyPair(bs58.decode(encodedPrivateKey),encodedPrivateKey.length>50?2:1)
    iost.account.addKeyPair(kp, "owner")
    iost.account.addKeyPair(kp, "active")
    iost.iost.setAccount(iost.account);
    // Redux dispatch
    store.dispatch(userActions.setUserInfo(id, kp.id))

    // CHROME send message
    chrome.runtime.sendMessage({
      action: 'LOGIN_SUCCESS',
      payload: {
        id,
        encodedPrivateKey,
        publicKey: kp.id,
      }
    })
    return iost.account
  },
  logoutAccount: () => {
    // Redux dispatch
    store.dispatch(userActions.resetUserInfo())

    iost.account = new IOST.Account('empty')
    // CHROME send message
    chrome.runtime.sendMessage({
      action: 'LOGOUT_SUCCESS'
    })
  },
  isValidAccount: (accountInfo, publicKey) => {
    if (!accountInfo || !accountInfo.permissions) {
      return false
    }

    const permissions = accountInfo.permissions
    let foundKey = false
    Object
      .keys(permissions)
      .forEach((permissionName) => {
        permissions[permissionName].items.forEach(({ id }) => {
          if (id === publicKey) {
            foundKey = true
            return true
          }
        })
      })

    return foundKey
  },
  sendTransaction: (contractAddress, contractAction, args) => {
    const tx = iost.iost.callABI(contractAddress, contractAction, args)
    tx.addApprove("*", "unlimited")
    iost.account.signTx(tx)

    const fire = {
      pending: () => {},
      success: () => {},
      failed: () => {},
    }

    const handler = new iost.pack.TxHandler(tx, iost.rpc)

    handler
      .onPending((pending) => {
        fire.pending(pending)
      })
      .onSuccess(async (response) => {
        fire.success(response)
      })
      .onFailed((err) => {
        fire.failed(err)
      })
      .send()
      .listen(1000, 60)

    return {
      onPending: (callback) => {
        fire.pending = callback
        return handler
      },
      onSuccess: (callback) => {
        fire.success = callback
        return handler
      },
      onFailed: (callback) => {
        fire.failed = callback
        return handler
      }
    }
  }
}

export default iost
