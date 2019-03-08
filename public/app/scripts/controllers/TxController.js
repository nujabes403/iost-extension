const iostController = require('./IostController')
const crypto = require('crypto')

const getStorage = (name, defvalue) => new Promise((resolve, reject) => {
  chrome.storage.local.get([name], (result) => {
    resolve(result[name] || defvalue)
  })
})

const IOST_NODE_URL = 'https://api.iost.io' //当前节点
const IOST_TEST_NODE_URL = 'http://13.52.105.102:30001' 

function TxController(state) {
  this.state = state
  this.txQueue = []
}

TxController.prototype.addTx = function(txInfo) {
  this.txQueue.push(txInfo)
  return this.txQueue.length
}

TxController.prototype.processTx = async function(txIdx, isAddWhitelist) {
  const txInfo = this.txQueue[txIdx]
  if (!txInfo) throw new Error(`That TX does not exist. slotIdx: ${txIdx}`)

  const { tx: _tx, txABI, actionId, account, network, domain } = txInfo
  const [ contract, actionName, memo ] = txABI
  if(isAddWhitelist){
    let whitelist = await getStorage('whitelist', [])
    let _to = contract
    if(actionName == 'transfer'){
      _to = memo[2]
    }
    whitelist.push({
      network,
      domain,
      account,
      contract,
      action: actionName,
      to: _to
    })

    const hash = {}
    whitelist = whitelist.reduce((prev, next) => {
      const _h = `${network}_${next.domain}_${next.account}_${next.contract}_${next.action}_${next.to}`
      hash[_h] ? '' : hash[_h] = true && prev.push(next);
      return prev
    },[]);
    chrome.storage.local.set({whitelist: whitelist})
  }

  const accounts = await getStorage('accounts', [])
  if(accounts.length){
    const acc = accounts.find(item => item.name == account && item.network == network)
    if(acc){
      const encodedPrivateKey = aesDecrypt(acc.privateKey, this.state.password)
      iostController.changeNetwork(network == 'MAINNET'?IOST_NODE_URL: IOST_TEST_NODE_URL)
      iostController.loginAccount(account, encodedPrivateKey)
      const tx = new iostController.pack.Tx()
      Object.keys(_tx).map(key => tx[key] = _tx[key])
      if(network != 'MAINNET'){
        tx.setChainID(1023)
      }
      // tx.addApprove("*", "unlimited")
      // _tx.amount_limit.map(item => tx.addApprove(item.token, item.value))
      // if (txABI[1] === 'transfer') {
      //   tx.addApprove("iost", txABI[2][3])
      // }
      const handler = iostController.iost.signAndSend(tx)
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0].id
        handler
        .on('pending', (pending) => {
          console.log(actionId, pending)
          chrome.tabs.sendMessage(activeTab, {
            actionId,
            pending: pending
          })
        })
        .on('success', (response) => {
          console.log(actionId, response)
          chrome.tabs.sendMessage(activeTab, {
            actionId,
            success: response
          })
        })
        .on('failed', (err) => {
          console.log(actionId, err)
          chrome.tabs.sendMessage(activeTab, {
            actionId,
            failed: err.stack?err.message:err
          })
        })
      })
    }else {
      //not find account
    }
  }else {
    //not find account
  }
  
  // const tx = iostController.iostInstance.callABI(...txObject)
  // if(iostController.network.indexOf('//api.iost.io') < 0){
  //   tx.setChainID(1023)
  // }
  // // 交易的机器本地时间不能比节点的时间提前超过1秒，此处-3秒防止本地时间不对
  // tx.time = tx.time - 3 * 1e9
  // tx.addApprove("*", "unlimited")

  // if (txObject[1] === 'transfer') {
  //   tx.addApprove("iost", txObject[2][3])
  // }

  // // 2. Sign on transfer tx
  // iostController.account.signTx(tx)

  // // 3. Handle transfer tx
  // const handler = new iostController.pack.TxHandler(tx, iostController.rpc)

  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   const activeTab = tabs[0].id
  //   handler
  //     .onPending((pending) => {
  //       console.log(actionId, pending)
  //       chrome.tabs.sendMessage(activeTab, {
  //         actionId,
  //         pending: pending
  //       })
  //     })
  //     .onSuccess(async (response) => {
  //       console.log(actionId, response)
  //       chrome.tabs.sendMessage(activeTab, {
  //         actionId,
  //         success: response
  //       })
  //     })
  //     .onFailed((err) => {
  //       console.log(actionId, err)
  //       chrome.tabs.sendMessage(activeTab, {
  //         actionId,
  //         failed: err
  //       })
  //     })
  //     .send()
  //     .listen(1000, 60)
  // })

  this.txQueue.splice(txIdx, 1)
}

TxController.prototype.cancelTx = function(txIdx) {
  const txInfo = this.txQueue[txIdx]
  
  if(txInfo){
    setTimeout(() => {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        const activeTab = tabs[0].id
        chrome.tabs.sendMessage(activeTab, {
          actionId: txInfo.actionId,
          failed: 'User rejected the signature request'
        })
      })
    },200)
  }
  if (!txInfo) throw new Error(`That TX is not exist. slotIdx: ${txIdx}`)
  this.txQueue.splice(txIdx, 1)
}

function aesDecrypt(encrypted, key){
  const decipher = crypto.createDecipher('aes192', key);
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


module.exports = TxController
