// const IOST = require('../../../iost.js')
const IOST = require('iost')
const bs58 = require('bs58')

const DEFAULT_IOST_CONFIG = {
  gasPrice: 100,
  gasLimit: 100000,
  delay: 0,
}

const IOST_NODE_URL = 'http://localhost:30001'
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
    const kp = new IOST.KeyPair(bs58.decode(encodedPrivateKey))
    iost.account.addKeyPair(kp, "owner")
    iost.account.addKeyPair(kp, "active")

    // CHROME send message
    chrome.runtime.sendMessage({
      action: 'LOGIN_SUCCESS',
      payload: {
        id,
        encodedPrivateKey,
      }
    })
    return iost.account
  },
  logoutAccount: () => {
    iost.account = new IOST.Account('empty')
    // CHROME send message
    chrome.runtime.sendMessage({
      action: 'LOGOUT_SUCCESS'
    })
  }
}

export default iost
