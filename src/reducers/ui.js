import {
  START_LOADING,
  FINISH_LOADING,
  OPEN_POPUP,
  CLOSE_POPUP,
  SHOW_TOAST,
  HIDE_TOAST,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  TOGGLE_OVERLAY,
  TOGGLE_MODAL,
  SETTING_LOCATION,
  DELETE_LOCATION,
  TRANSFER_INFO,
} from 'actions/actionTypes'

const initialState = {
  isLoading: false,
  popup: null,
  toast: null,
  isOverlayOn: false,
  isShowModal: false,
  locationList: [],
  transferInfo: null,
}

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case FINISH_LOADING:
      return {
        ...state,
        isLoading: false,
      }
    case START_LOADING:
      return {
        ...state,
        isLoading: true,
      }
    case OPEN_POPUP:
      return {
        ...state,
        popup: action.payload.popup,
      }
    case CLOSE_POPUP:
      return {
        ...state,
        popup: null,
      }
    case SHOW_TOAST:
      return {
        ...state,
        toast: action.payload.toast,
      }
    case HIDE_TOAST:
      return {
        ...state,
        toast: null,
      }
    case SHOW_OVERLAY:
      return {
        ...state,
        isOverlayOn: true,
        overlayHideCallback: action.payload.overlayHideCallback,
      }
    case HIDE_OVERLAY:
      return {
        ...state,
        isOverlayOn: false,
        overlayHideCallback: null,
      }
    case TOGGLE_OVERLAY:
      return {
        ...state,
        isOverlayOn: !state.isOverlayOn,
      }
    case TOGGLE_MODAL:
      return {
        ...state,
        isShowModal: !state.isShowModal,
      }
    case SETTING_LOCATION: {
      state.locationList.push(action.payload.location)
      if (state.locationList.length > 5) {
        state.locationList.shift()
      }
      return {
        ...state,
        locationList: state.locationList,
      }
    }
    case DELETE_LOCATION: {
      state.locationList.pop()
      return {
        ...state,
        locationList: state.locationList,
      }
    }
    case TRANSFER_INFO: {
      return {
        ...state,
        transferInfo: action.payload.transferInfo,
      }
    }
    default:
      return state
  }
}

export default uiReducer
