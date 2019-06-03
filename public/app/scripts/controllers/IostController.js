const IOST = require('iost')
const bs58 = require('bs58')
const crypto = require('crypto')


const getAccounts = () => new Promise((resolve, reject) => {
  chrome.storage.local.get(['accounts'], ({accounts}) => {
    resolve(accounts || [])
  })
})

const DEFAULT_IOST_CONFIG = {
  gasPrice: 100,
  gasLimit: 100000,
  delay: 0,
}

const IOST_NODE_URL = 'http://localhost:30001'
const IOST_PROVIDER = new IOST.HTTPProvider(IOST_NODE_URL)
const delay = (ms) =>  new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve()
  }, ms)
})
const iost = {
  pack: IOST,
  iost: new IOST.IOST(DEFAULT_IOST_CONFIG, IOST_PROVIDER),
  rpc: new IOST.RPC(IOST_PROVIDER),
  account: new IOST.Account('empty'),
  network: IOST_NODE_URL,
  state: null,
  activeAccount: null, //当前账户
  // network
  changeNetwork: async (url) => {
    const newNetworkProvider = new IOST.HTTPProvider(url)
    iost.iost = new IOST.IOST(DEFAULT_IOST_CONFIG, newNetworkProvider)
    iost.rpc = new IOST.RPC(newNetworkProvider)
    await iost.iost.setRPC(iost.rpc)
    iost.network = url
    // Save last network you used in extension storage.
    chrome.storage.local.set({
      activeNetwork: url
    })
  },
  changeAccount: (account) => {
    iost.activeAccount = account
    iost.account = new IOST.Account(account.name)
    const password = iost.state.password
    const encodedPrivateKey = aesDecrypt(account.privateKey, password)
    const kp = new IOST.KeyPair(bs58.decode(encodedPrivateKey),encodedPrivateKey.length>50?2:1)
    iost.account.addKeyPair(kp, "owner")
    iost.account.addKeyPair(kp, "active")
    iost.iost.setAccount(iost.account)
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
    chrome.storage.local.remove(['activeAccount'])
  },
  checkCreateAccount: async (obj, time = 240) => {
    const {name, publicKey, privateKey } = obj
    if(time > 0 && iost.state.unlock && iost.state.password){
      await delay(5*1000)
      try {
        await iost.rpc.blockchain.getAccountInfo(name)
        let accounts = await getAccounts()
        const hash = {}
        accounts.push({
          name,
          network: 'MAINNET',
          privateKey: aesEncrypt(privateKey, iost.state.password),
          publicKey,
        })
        accounts = accounts.reduce((prev, next) => {
          const _h = `${next.name}_${next.network}`
          hash[_h] ? '' : hash[_h] = true && prev.push(next);
          return prev
        },[]);
        chrome.storage.local.set({accounts: accounts})
      } catch (err) {
        iost.checkCreateAccount(obj, --time)
      }
    }
  },
  setState: (state) => {
    iost.state = state
  }
}

function aesEncrypt(encrypted, key){
  const cipher = crypto.createCipher('aes192', key);
  let crypted = cipher.update(data, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function aesDecrypt(encrypted, key){
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = iost
module.exports.iostInstance = iost.iost
