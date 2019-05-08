const crypto = require('crypto')
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
    case 'FIND_TX_BY_IDX':
      const tx = txController.findByIdx(message.idx)

      sendResponse(tx)
      break
    case ACTION.TX_ASK:
      if(!store.unlock){
        txController.port.forEach((port) => {
          port.postMessage({
            actionId: message.actionId,
            failed: 'locked'
          });
        })
        return  true
      }
      if(!iostController.activeAccount){
        txController.port.forEach((port) => {
          port.postMessage({
            actionId: message.actionId,
            failed: 'Index should be logged in to send a tx'
          });
        })
        return  true
        // throw Error('Index should be logged in to send a tx')
      }else if(iostController.account.getID() === 'empty'){
        txController.port.forEach((port) => {
          port.postMessage({
            actionId: message.actionId,
            failed: 'Index should be logged in to send a tx'
          });
        })
        return true
        // throw Error('Index should be logged in to send a tx')
      }
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
        if(whitelist && whitelist.length && whitelist.find(item => item.network == message.payload.network && item.domain == _tx.domain && item.account == _tx.account.name && item.contract == contract && item.action == actionName && item.to == _to)){
          txController.processTx(slotIdx)
        }else {
          const height = 610;
          const width = 600;
          let middleX = parseInt(window.screen.availWidth/2 - (width/2));
          let middleY = parseInt(window.screen.availHeight/2 - (height/2));
          const url = 'askTx.html'
          + `?slotIdx=${slotIdx}`
          + `&accountId=${_tx.account.name}`
          + `&tx=${encodeURIComponent(JSON.stringify(message.payload.txABI))}`
          chrome.windows.create({
            url,
            type: 'popup',
            width,
            height,
            left: middleX,
            top: middleY
          })
        }
      })
      break
    case ACTION.TX_CONFIRM:
      txController.processTx(
        message.payload.slotIdx,
        message.payload.isAddWhitelist,
        message.payload.iGASPrice,
        message.payload.iGASLimit)
      break
    case ACTION.TX_CANCEL:
      txController.cancelTx(message.payload.slotIdx)
      break
    case ACTION.CHANGE_NETWORK:
      iostController.changeNetwork(message.payload.url)
      break
    case ACTION.CHANGE_ACCOUNT:
      iostController.changeAccount(message.payload)
      break
    case ACTION.LOGIN_SUCCESS:
      // iost login
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
    case 'GET_ACCOUNT': {
        const account = iostController.activeAccount;
        store.getLockState()?sendResponse({
          account: {
            name: account.name,
            network: account.network,
            proxyAccount: account.proxyAccount
          },
          network: account.network,
        }):sendResponse({
          account: {
            name: null,
            type: null
          },
          network: 'MAINNET',
        })
      }
      break
    case 'CHECK_CREATE_ACCOUNT':
      iostController.checkCreateAccount(message.payload)
      break
    default:
  }
})

function aesDecrypt(encrypted, key){
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
