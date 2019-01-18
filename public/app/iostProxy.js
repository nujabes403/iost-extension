const iost = require('iost')
const ACTION = require('./extensionActions')

const callABI = ((actionId) => (...args) => {
  const txABI = args
  const message = {
    action: ACTION.TX_ASK,
    actionId,
    payload: txABI
  }

  window.postMessage(message, '*')
})(0)

module.exports = {
  callABI,
}
