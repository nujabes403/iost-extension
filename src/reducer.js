import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from 'reducers/ui'
import token from 'reducers/token'
import user from 'reducers/user'
import accounts from 'reducers/accounts'
import { i18nReducer } from 'react-redux-i18n'

const reducer = combineReducers({
  routing: routerReducer,
  ui,
  token,
  user,
  accounts,
  i18n: i18nReducer,
})

export default reducer
