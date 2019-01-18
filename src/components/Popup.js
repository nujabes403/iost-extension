import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'

import ui from 'utils/ui'

import './Popup.scss'

const Popup = ({
  popup
 }) => {
  return popup && (
    <div className="Popup">
      <div className="Popup__content">
        <div className="Popup__closeButton" onClick={() => ui.closePopup()} />
        {popup.content}
      </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  popup: state.ui.popup,
})

export default connect(mapStateToProps, null)(Popup)
