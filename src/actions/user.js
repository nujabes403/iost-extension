import {
  SET_USER_INFO,
  RESET_USER_INFO,
  CREATE_ACCOUNT,
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


export const createAccountInfo = (data) => ({
  type: CREATE_ACCOUNT,
  payload: {
    data
  }
})
