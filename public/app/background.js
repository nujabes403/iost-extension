const ACTION = require('./extensionActions')
const TxController = require('./scripts/controllers/TxController')
const IostController = require('./scripts/controllers/IostController')

const txController = new TxController()
const iostController = IostController

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case ACTION.TX_ASK:
      if (iostController.account.getID() === 'empty') 
        throw Error('Account should be logged in to send a tx')
      const totalTxLength = txController.addTx(message.payload)
      const slotIdx = totalTxLength - 1
      chrome.windows.create({
        url: `askTx.html?slotIdx=${slotIdx}`,
        type: 'popup',
        width: 400,
        height: 400,
      }, console.log)
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
        message.payload.account,
        message.payload.privateKey,
      )
      break
    default:
  }
})
