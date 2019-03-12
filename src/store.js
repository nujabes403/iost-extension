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

const checkLan = (str) => ['en','zh','ko'].indexOf(str)> -1 ? str : null

const defaultLan = () => {
  let lang = navigator.language||navigator.userLanguage;
  lang = lang.substr(0, 2);
  return checkLan(lang) || 'en'
}

// i18n set
syncTranslationWithStore(store)
store.dispatch(loadTranslations(translationObject))
chrome.storage.local.get(['locale'], (result) => {
  store.dispatch(setLocale(result.locale || defaultLan()))
})

export default store
