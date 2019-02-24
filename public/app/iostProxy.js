// const iost = require('iost')
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

const DEFAULT_IOST_CONFIG = {
  gasPrice: 100,
  gasLimit: 100000,
  delay: 0,
}
const signAndSend = () => {
  console.log(123)
}
const IOST_NODE_URL = 'http://api.iost.io' //当前节点
const IOSTJS = {
  newIost: (IOST) => {
      IOSTJS.pack = IOST
      IOSTJS.iost = new IOST.IOST(DEFAULT_IOST_CONFIG);
      const IOST_PROVIDER = new IOST.HTTPProvider(IOST_NODE_URL)
      IOSTJS.rpc = new IOST.RPC(IOST_PROVIDER)
      IOSTJS.iost.signAndSend = signAndSend
      IOSTJS.iost.setRPC(IOSTJS.rpc)
      IOSTJS.iost.account = new IOST.Account(IOSTJS.account)
      IOSTJS.iost.setAccount(IOSTJS.iost.account)
      return IOSTJS.iost
  },
  enable: () => {
  //获取当前账号，后期可以改为账号选择
  },

  setAccount: (account) => {
    IOSTJS.account = account
  }

}

window.postMessage({action: 'GET_ACCOUNT'}, '*')

// window.iost = IOSTJS

window.addEventListener('message', (e) => {
  if (e.source !== window) return
  const messageData = e.data && e.data.message
  if (messageData && messageData.actionId !== undefined) {
    // console.log(messageData)
    const fire = actionMap[messageData.actionId]
    if (messageData.pending) {
      fire.pending(messageData.pending)
    } else if (messageData.success) {
      fire.success(messageData.success)
    } else if (messageData.failed) {
      fire.failed(messageData.failed)
    }else if(messageData.account){
      IOSTJS.setAccount(messageData.account)
    }
  }

  // setTimeout(()=>{
  //   user.name = '123'
  // }, 5000)
 
})




module.exports = {
  callABI,
  // IOSTJS
}
