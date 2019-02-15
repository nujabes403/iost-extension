import {
  setLocale,
} from 'react-redux-i18n'
import store from '../store'

const i18n = {
  setLocale: (locale) => {
    chrome.storage.sync.set({ locale: locale })
    store.dispatch(setLocale(locale))
  },
  getLocale: () => store.getState().i18n.locale,
}

export default i18n
