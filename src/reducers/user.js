import {
  SET_USER_INFO,
  RESET_USER_INFO,
} from 'actions/actionTypes'

const initialState = {
  userInfo: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload.userInfo,
      }
    case RESET_USER_INFO:
      return {
        ...state,
        userInfo: null,
      }
    default:
      return state
  }
}

export default userReducer
