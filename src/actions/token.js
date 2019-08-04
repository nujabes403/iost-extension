import {
  UPDATE_SAVED_TOKEN_SYMBOLS,
  SELECT_TOKEN,
} from 'actions/actionTypes'

export const updateSavedTokenSymbols = (tokenSymbols) => ({
  type: UPDATE_SAVED_TOKEN_SYMBOLS,
  payload: {
    tokenSymbols,
  }
})

export const selectToken = (tokenSymbol) => ({
  type: SELECT_TOKEN,
  payload: {
    tokenSymbol: tokenSymbol,
  }
})