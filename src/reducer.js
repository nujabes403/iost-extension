import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import ui from 'reducers/ui'
import token from 'reducers/token'
import { i18nReducer } from 'react-redux-i18n'

const reducer = combineReducers({
  routing: routerReducer,
  ui,
  token,
  i18n: i18nReducer,
})

export default reducer
