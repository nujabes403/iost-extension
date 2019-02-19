import {
  SET_ACCOUNTS,
  ADD_ACCOUNTS,
  ADD_ACCOUNT,
  DEL_ACCOUNT
} from 'actions/actionTypes'

const initialState = {
  accounts: [],
}

// {
//   name,
//   network,
//   privateKey,
//   publicKey,
// }

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload.accounts,
      }
    case ADD_ACCOUNTS:
      return {
        ...state,
        accounts: [...state.accounts,...action.payload.accounts]
      }
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts,action.payload.account]
      }
    case DEL_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(item => action.payload.account.name != item.name && action.payload.account.network != item.network)
      }
    default:
      return state
  }
}

export default userReducer
