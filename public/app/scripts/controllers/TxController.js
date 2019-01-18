const iostController = require('./IostController')

function TxController() {
  this.txQueue = []
}

TxController.prototype.addTx = function(tx) {
  this.txQueue.push(tx)
  return this.txQueue.length
}

TxController.prototype.processTx = function(txIdx) {
  if (!this.txQueue[txIdx]) throw new Error(`That TX is not exist. slotIdx: ${txIdx}`)
  console.log(this.txQueue[txIdx], 'this.txQueue[txIdx]')
  const tx = iostController.iostInstance.callABI(...this.txQueue[txIdx])
  tx.addApprove("*", "unlimited")
  tx.addApprove("iost", this.txQueue[txIdx][2][3])
  console.log(tx, 'tx')
  tx.chain_id = 1024
  console.log(tx, 'tx after')

  // 2. Sign on transfer tx
  console.log(iostController.account, 'iostController.account')
  iostController.account.signTx(tx)

  // 3. Handle transfer tx
  const handler = new iostController.pack.TxHandler(tx, iostController.rpc)

  handler
    .onPending((pending) => {
      console.log(pending, 'pending')
    })
    .onSuccess(async (response) => {
      console.log(response, 'success response')
    })
    .onFailed((err) => {
      console.log(err, 'err')
    })
    .send()
    .listen(1000, 15)
  this.txQueue.splice(txIdx, 1)
}

TxController.prototype.cancelTx = function(txIdx) {
  if (!this.txQueue[txIdx]) throw new Error(`That TX is not exist. slotIdx: ${txIdx}`)
  this.txQueue.splice(txIdx, 1)
}

module.exports = TxController
