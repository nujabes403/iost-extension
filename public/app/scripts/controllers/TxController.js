const iostController = require('./IostController')

function TxController() {
  this.txQueue = []
}

TxController.prototype.addTx = function(txInfo) {
  this.txQueue.push(txInfo)
  return this.txQueue.length
}

TxController.prototype.processTx = function(txIdx) {
  const txInfo = this.txQueue[txIdx]
  if (!txInfo) throw new Error(`That TX does not exist. slotIdx: ${txIdx}`)

  const txObject = txInfo.tx
  const actionId = txInfo.actionId

  const tx = iostController.iostInstance.callABI(...txObject)
  if(iostController.network.indexOf('//api.iost.io') < 0){
    tx.setChainID(1023)
  }
  // 交易的机器本地时间不能比节点的时间提前超过1秒，此处-3秒防止本地时间不对
  tx.time = tx.time - 3 * 1e9
  tx.addApprove("*", "unlimited")

  if (txObject[1] === 'transfer') {
    tx.addApprove("iost", txObject[2][3])
  }

  // 2. Sign on transfer tx
  iostController.account.signTx(tx)

  // 3. Handle transfer tx
  const handler = new iostController.pack.TxHandler(tx, iostController.rpc)

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const activeTab = tabs[0].id
    handler
      .onPending((pending) => {
        console.log(actionId, pending)
        chrome.tabs.sendMessage(activeTab, {
          actionId,
          pending: pending
        })
      })
      .onSuccess(async (response) => {
        console.log(actionId, response)
        chrome.tabs.sendMessage(activeTab, {
          actionId,
          success: response
        })
      })
      .onFailed((err) => {
        console.log(actionId, err)
        chrome.tabs.sendMessage(activeTab, {
          actionId,
          failed: err
        })
      })
      .send()
      .listen(1000, 60)
  })

  this.txQueue.splice(txIdx, 1)
}

TxController.prototype.cancelTx = function(txIdx) {
  if (!this.txQueue[txIdx]) throw new Error(`That TX is not exist. slotIdx: ${txIdx}`)
  this.txQueue.splice(txIdx, 1)
}

module.exports = TxController
