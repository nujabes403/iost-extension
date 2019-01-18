function confirmTx () {
  chrome.runtime.sendMessage({
    action: 'TX_CONFIRM',
    payload: {
      slotIdx: window.location.search.split('=')[1],
    }
  })
}

function cancelTx () {
  chrome.runtime.sendMessage({
    action: 'TX_CANCEL',
    payload: {
      slotIdx: window.location.search.split('=')[1],
    }
  })
  window.close()
}

document.addEventListener('DOMContentLoaded', () => {
  const $txConfirm = document.getElementById('btn-tx-confirm')
  const $txCancel = document.getElementById('btn-tx-cancel')

  $txConfirm.addEventListener('click', confirmTx)
  $txCancel.addEventListener('click', cancelTx)
})
