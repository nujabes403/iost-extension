import {
  finishLoading,
  startLoading,
  openPopup,
  closePopup,
  showToast,
  hideToast,
  toggleModal,
} from 'actions/ui'
import store from '../store'

export const ui = {
  startLoading: () => store.dispatch(startLoading()),
  finishLoading: () => store.dispatch(finishLoading()),
  openPopup: (popup) => store.dispatch(openPopup(popup)),
  closePopup: () => store.dispatch(closePopup()),
  showToast: (toast) => store.dispatch(showToast(toast)),
  hideToast: () => store.dispatch(hideToast()),
  toggleModal: () => store.dispatch(toggleModal()),
}

window.ui = ui

export default ui
