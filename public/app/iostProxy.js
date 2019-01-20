const iost = require('iost')
const ACTION = require('./extensionActions')

const actionMap = {}

const callABI = ((actionId) => (...args) => {
  const txABI = args
  const message = {
    action: ACTION.TX_ASK,
    actionId,
    payload: txABI
  }

  const fire = {
    pending: () => {},
    success: () => {},
    failed: () => {},
  }

  const handler = {
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

  actionMap[actionId] = fire

  window.postMessage(message, '*')

  return handler
})(0)

window.addEventListener('message', (e) => {
  if (e.source !== window) return
  const messageData = e.data && e.data.message
  if (messageData && messageData.actionId !== undefined) {
    const fire = actionMap[messageData.actionId]
    if (messageData.pending) {
      fire.pending(messageData.pending)
    } else if (messageData.success) {
      fire.success(messageData.success)
    } else if (messageData.failed) {
      fire.failed(messageData.failed)
    }
  }
})

module.exports = {
  callABI,
}
