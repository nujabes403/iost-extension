import {
  setUserInfo,
  resetUserInfo,
} from 'actions/user'
import {
  setAccounts,
} from 'actions/accounts'
import store from '../store'
import utils from 'utils'

export const user = {
  setUserInfo: (accountName, publicKey) => store.dispatch(setUserInfo(accountName, publicKey)),

  resetUserInfo: () => store.dispatch(resetUserInfo()),

  getUsers: () => new Promise((resolve, reject) => {
    chrome.storage.local.get(['accounts'], ({accounts}) => {
      resolve(accounts || [])
    })
  }),

  setUsers: (accounts) => new Promise((resolve, reject) => {
    store.dispatch(setAccounts(accounts))
    chrome.storage.local.set({accounts: accounts},() =>{
      resolve()
    })
  }),
  
  

  addUsers: (accounts) => new Promise((resolve, reject) => {
    user.getUsers().then(list => {
      const hash = {}
      accounts = list.concat(accounts).reduceRight((prev, next) => {
        const _h = `${next.network}_${next.name}`
        hash[_h] ? '' : hash[_h] = true && prev.push(next);
        return prev
      },[]).reverse();
      store.dispatch(setAccounts(accounts))
      chrome.storage.local.set({accounts: accounts},() => {
        resolve(accounts)
      })
    })
  }),

  getUserUnique: (account) => {
    return `${account.network}_${account.name}`
  },

  getActiveAccount: () => new Promise((resolve, reject) => {
    chrome.storage.local.get(['activeAccount'], ({activeAccount}) => {
      resolve(activeAccount)
    })
  }),

  setActiveAccount: (account) => new Promise((resolve, reject) => {
    chrome.storage.local.set({ activeAccount: account },() => {
      resolve(account)
    })
  }),

  removeActiveAccount: (account) => new Promise((resolve, reject) => {
    chrome.storage.local.remove(['activeAccount'],() => {
      resolve()
    })
  }),
  
  getLockPassword: () => new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: 'GET_PASSWORD' },(res)=> {
      if(res != ''){
        resolve(res)
      }else {
        reject('no password')
      }
    })
  }),

  getEnPassword: () => new Promise((resolve, reject) => {
    chrome.storage.local.get(['password'],({password}) => {
      if(password){
        resolve(password)
      }else{
        reject()
      }
    })
  }),

  getLockState: () => new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      action: 'GET_UNLOCK_STATE',
    },(res)=> {
      resolve(res)
    })
  })


}



export default user
