
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import Dialog from 'rc-dialog'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import cx from 'classnames'
import './index.scss'

class Modal extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { visible = true, zIndex = 5, onClose, afterClose, closable, hasclose = true, maskClosable = true, title, children, DialogClass, className,
    } = this.props
    return(
      <Dialog
          visible={visible}
          onClose={onClose}
          afterClose={afterClose}
          closable={false}
          zIndex={zIndex}
          maskClosable={maskClosable}
          WrapComponent="div"
          transitionName="rc-dialog-fade"
          maskTransitionName="rc-dialog-fade"
          className={cx('modal-wrapper', DialogClass)}
        >
        <div className={cx('content-box', className)} ref={e => this.content = e}>
          <p className="title">{title}</p>
          {children}
        </div>
        { hasclose && <i className="icon-close" onClick={onClose} /> }
      </Dialog>
    )
 }
}



class Modal1 extends Component {
  constructor(props){
    super(props)
  }

  onCloseModal = () => {
    // this.store.app.setVisible('visible10', false)
  }

  render(){
    console.log(this.props)
    return (
      <Modal
        title="123"
        {...this.props}
        visible={false}
        onClose={this.onCloseModal}
        DialogClass='delete-wrapper'
      >
        <div className="delete-container">

        </div>
      </Modal>
    )
  } 
}

const mapStateToProps = (state) => ({
  isCloseModal: state.ui.isCloseModal,
})

Modal.Modal1 = connect(mapStateToProps)(Modal1)

export default Modal
