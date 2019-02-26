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

const IOST_NODE_URL = 'http://api.iost.io' //当前节点
const IOST_TEST_NODE_URL = 'http://13.52.105.102:30001' //当前节点
const IOSTJS = {
  newIost: (IOST) => {
      IOSTJS.pack = IOST
      IOSTJS.iost = new IOST.IOST(DEFAULT_IOST_CONFIG);
      const IOST_PROVIDER = new IOST.HTTPProvider(IOSTJS.network == 'MAINNET'?IOST_NODE_URL: IOST_TEST_NODE_URL)
      IOSTJS.rpc = new IOST.RPC(IOST_PROVIDER)
      IOSTJS.iost.signAndSend = signAndSend
      IOSTJS.iost.setRPC(IOSTJS.rpc)
      IOSTJS.iost.account = new IOST.Account(IOSTJS.account)
      IOSTJS.iost.setAccount(IOSTJS.iost.account)
      return IOSTJS.iost
  },
  enable: () => {
    //获取当前账号，后期可以改为账号选择
    return new Promise((resolve, reject) => {
      if(IOSTJS.iost){
        resolve(IOSTJS.iost.account._id)
      }else if(IOSTJS.account != 'empty'){
        resolve(IOSTJS.account)
      }else {
        resolve()
      }
    })
  },

  setAccount: ({account, network}) => {
    IOSTJS.account = account
    IOSTJS.network = network
  },
}

function signAndSend(tx){
  const cb = new Callback()
  const action = tx.actions[0]
  const network = this.currentRPC._provider._host.indexOf('//api.iost.io') > -1?'MAINNET':'TESTNET'
  const message = {
    action: ACTION.TX_ASK,
    actionId: 0,
    payload: {
      tx,
      account: this.account._id,
      network,
      txABI: [action.contract, action.actionName, JSON.parse(action.data)]
    }
  }
  actionMap[0] = cb
  window.postMessage(message, '*')
  return cb
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
      fire.pushMsg("pending", messageData.pending)
      // fire.pending(messageData.pending)
    } else if (messageData.success) {
      fire.pushMsg("success", messageData.success)
      // fire.success(messageData.success)
    } else if (messageData.failed) {
      fire.pushMsg("failed", messageData.failed)
      // fire.failed(messageData.failed)
    }else if(messageData.payload){
      IOSTJS.setAccount(messageData.payload)
    }
  }

  // setTimeout(()=>{
  //   user.name = '123'
  // }, 5000)
 
})


class Callback {
  constructor() {
      this.map = {}
  }

  on(msg, f) {
      this.map[msg] = f;
      return this;
  }

  pushMsg(msg, args) {
      const f = this.map[msg];
      if (f === undefined) {
          return
      }
      f(args)
  }
}

module.exports = IOSTJS