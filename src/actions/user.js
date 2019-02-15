import {
  SET_USER_INFO,
  RESET_USER_INFO,
} from 'actions/actionTypes'

export const setUserInfo = (accountName, publicKey) => ({
  type: SET_USER_INFO,
  payload: {
    userInfo: {
      accountName,
      publicKey,
    },
  }
})

export const resetUserInfo = () => ({
  type: RESET_USER_INFO,
})
