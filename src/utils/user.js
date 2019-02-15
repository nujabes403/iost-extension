import {
  setUserInfo,
  resetUserInfo,
} from 'actions/user'
import store from '../store'

export const user = {
  setUserInfo: (accountName, publicKey) => store.dispatch(setUserInfo(accountName, publicKey)),
  resetUserInfo: () => store.dispatch(resetUserInfo()),
}

export default user
