import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import { setLocale, loadTranslations, syncTranslationWithStore } from 'react-redux-i18n'

import translationObject from 'constants/i18n'
import reducer from './reducer'

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, routingMiddleware))
)

// i18n set
syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationObject))
chrome.storage.sync.get(['locale'], (result) => {
  store.dispatch(setLocale(result.locale || 'zh'))
})

export default store
