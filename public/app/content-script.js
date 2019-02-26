const fs = require('fs')
const path = require('path')
const ACTION = require('./extensionActions')
const inpagePath = chrome.runtime.getURL('app/inpage.js')

// const inpageContent = fs.readFileSync(path.join(__dirname, '..', '..', 'dist', 'app', 'inpage.js')).toString()
// const inpageContent = fs.readFileSync(path.join(__dirname, 'app', 'inpage.js')).toString()
// const inpageSuffix = '//# sourceURL=' + chrome.runtime.getURL('app/inpage.js') + '\n'
// const inpageBundle = inpageContent + inpageSuffix
// console.log(inpageBundle)
function injectInpageScript() {
  try {
    const container = document.head || document.documentElement
    const scriptTag = document.createElement('script')
    scriptTag.setAttribute('async', false)
    scriptTag.setAttribute('src', inpagePath)
    // scriptTag.textContent = inpageBundle
    container.insertBefore(scriptTag, container.children[0])
    // After injecting the script, *run*, remove the script tag.
    // container.removeChild(scriptTag)
  } catch (e) {
    console.error('injection failed', e)
  }
}

function listenForProviderRequest() {
  window.addEventListener('message', ({ source, data }) => {
    if (source !== window || !data || !data.action) return

    switch (data.action) {
      case ACTION.TX_ASK:
        chrome.runtime.sendMessage({
          action: data.action,
          payload: data.payload,
          actionId: data.actionId,
        })
        break;
      case 'GET_ACCOUNT': 
        chrome.runtime.sendMessage({
          action: 'GET_ACCOUNT',
        },(payload) => {
          window.postMessage({
            message: {
              actionId: 0,
              payload
            },
          }, '*')
        })
        break;
      default:
    }
  })

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // From content script to webpage injected script.
    window.postMessage({
      message,
    }, '*')
  })
}

injectInpageScript()
listenForProviderRequest()
