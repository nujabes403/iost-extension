function NetworkController() {
  const _this = this
  this.networkList = []

  chrome.storage.sync.get(['networkList'], (result) => {
    _this.networkList = result.networkList || _this.networkList
  })
}

NetworkController.prototype.saveNewNetwork = function(url) {
  const alreadyExistNetwork = this.networkList.findIndex(a => a === url) !== -1
  if (alreadyExistNetwork) return

  chrome.storage.sync.set({
    networkList: [...this.networkList, {
      label: url,
      value: url,
    }]
  })
}

NetworkController.prototype.removeNetwork = function(url) {
  const removeIdx = this.networkList.findIndex(a => a === url)
  this.networkList.splice(removeIdx, 1)

  chrome.storage.sync.set({
    networkList: this.networkList,
  })
}

NetworkController.prototype.getNetworkList = function() {
  return this.networkList
}

module.exports = NetworkController
