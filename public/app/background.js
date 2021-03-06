const ACTION = require('./extensionActions')
const TxController = require('./scripts/controllers/TxController')
const IostController = require('./scripts/controllers/IostController')
const NetworkController = require('./scripts/controllers/NetworkController')

const txController = new TxController()
const networkController = new NetworkController()
const iostController = IostController

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case ACTION.TX_ASK:
      if (iostController.account.getID() === 'empty')
        throw Error('Account should be logged in to send a tx')
      const totalTxLength = txController.addTx({
        tx: message.payload,
        actionId: message.actionId,
      })
      const slotIdx = totalTxLength - 1
      // const [contractAddress, abi, args] = message.payload
      chrome.windows.create({
        url: 'askTx.html'
          + `?slotIdx=${slotIdx}`
          + `&tx=${encodeURIComponent(JSON.stringify(message.payload))}`,
        type: 'popup',
        width: 400,
        height: 300,
      })
      break
    case ACTION.TX_CONFIRM:
      txController.processTx(message.payload.slotIdx)
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
    default:
  }
})
