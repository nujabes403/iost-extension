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
  network: IOST_NODE_URL,
  // network
  changeNetwork: async (url) => {
    const newNetworkProvider = new IOST.HTTPProvider(url)
    iost.iost = new IOST.IOST(DEFAULT_IOST_CONFIG, newNetworkProvider)
    iost.rpc = new IOST.RPC(newNetworkProvider)
    iost.iost.setRPC(iost.rpc)
    iost.network = url
    // Save last network you used in extension storage.
    chrome.storage.local.set({
      activeNetwork: url
    })
  },
  // account
  loginAccount: (name, encodedPrivateKey) => {
    iost.account = new IOST.Account(name)
    const kp = new IOST.KeyPair(bs58.decode(encodedPrivateKey),encodedPrivateKey.length>50?2:1)
    iost.account.addKeyPair(kp, "owner")
    iost.account.addKeyPair(kp, "active")
    iost.iost.setAccount(iost.account)
    // Save secure account information in extension storage.
    return iost.account
  },
  logoutAccount: () => {
    iost.account = new IOST.Account('empty')
    // Save secure account information in extension storage.
    chrome.storage.sync.remove(['activeAccount'])
  }
}

module.exports = iost
module.exports.iostInstance = iost.iost
