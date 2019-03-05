const ACTION = require('./extensionActions')
const TxController = require('./scripts/controllers/TxController')
const IostController = require('./scripts/controllers/IostController')
const NetworkController = require('./scripts/controllers/NetworkController')


class Store {
  constructor(){
    this.unlock  = false
    this.password  = ''
  }

  setPassword(password){
    this.password = password
    this.unlock = true
  }

  getPassword(){
    return this.password
  }

  getLockState(){
    return this.unlock
  }

  lock(){
    this.password = ''
    this.unlock = false
  }

}

const store = new Store()


// const state = {
//   unlock: false,
//   password: '',

//   setPassword(password){
//     this.password = password;
//     this.unlock = true
//   },

//   getPassword(){
//     return this.password
//   },
  
//   getLockState(){
//     return this.unlock
//   },

//   lock(){
//     this.password = ''
//     this.unlock = false
//   }
// }

const txController = new TxController(store)
const networkController = new NetworkController()
const iostController = IostController

iostController.setState(store)


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case ACTION.TX_ASK:
      if (iostController.account.getID() === 'empty')
        throw Error('Index should be logged in to send a tx')
      const _tx = {
        tx: message.payload.tx,
        txABI: message.payload.txABI,
        account: message.payload.account,
        network: message.payload.network,
        domain: message.payload.domain,
        actionId: message.actionId,
      }
      const [ contract, actionName, memo ] = message.payload.txABI
      const isTransfer = actionName == 'transfer'
      const totalTxLength = txController.addTx(_tx)
      const slotIdx = totalTxLength - 1
      let _to = contract
      if(isTransfer){
        _to = memo[2]
      }
      // const [contractAddress, abi, args] = message.payload
      chrome.storage.local.get(['whitelist'], ({whitelist}) => {
        if(whitelist && whitelist.length && whitelist.find(item =>item.network == message.payload.network && item.domain == _tx.domain && item.account == _tx.account && item.contract == contract && item.action == actionName && item.to == _to)){
          txController.processTx(slotIdx)
        }else {
          chrome.windows.create({
            url: 'askTx.html'
              + `?slotIdx=${slotIdx}`
              + `&accountId=${iostController.account.getID()}`
              + `&tx=${encodeURIComponent(JSON.stringify(message.payload.txABI))}`,
            type: 'popup',
            width: 500,
            height: 700,
          })
        }
      })
      break
    case ACTION.TX_CONFIRM: 
      txController.processTx(message.payload.slotIdx, message.payload.isAddWhitelist)
      break
    case ACTION.TX_CANCEL:
      txController.cancelTx(message.payload.slotIdx)
      break
    case ACTION.CHANGE_NETWORK:
      iostController.changeNetwork(message.payload.url)
      break
    case ACTION.LOGIN_SUCCESS:
      iostController.loginAccount(
        message.payload.id,
        message.payload.encodedPrivateKey,
      )
      break
    case ACTION.LOGOUT_SUCCESS:
      iostController.logoutAccount()
      break
    case ACTION.SAVE_NEW_NETWORK:
      networkController.saveNewNetwork(message.payload.newNetworkURL)
      break
    case 'GET_UNLOCK_STATE': 
      sendResponse(store.getLockState())
      break
    case 'SET_LOCK': 
      store.lock()
      break
    case 'SET_PASSWORD': 
      store.setPassword(message.payload.password)
      break
    case 'GET_PASSWORD': 
      sendResponse(store.getPassword())
      break
    case 'GET_ACCOUNT': 
      store.getLockState()?sendResponse({
        account: iostController.account.getID(),
        network: iostController.network.indexOf('//api.iost.io') > -1? 'MAINNET':'TESTNET'
      }):sendResponse({
        account: null,
        network: 'MAINNET',
      })
      break
    case 'CHECK_CREATE_ACCOUNT': 
      iostController.checkCreateAccount(message.payload)
      break
    default:
  }
})
