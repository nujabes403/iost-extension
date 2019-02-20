
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'
import Dialog from 'rc-dialog'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import cx from 'classnames'
import Button from 'components/Button'
import ui from 'utils/ui';
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
    ui.toggleModal()
  }

  confirmDelete = () => {

  }
  render(){
    // console.log(this.props)
    const { isShowModal } = this.props
    return (
      <Modal
        title={I18n.t('confirmDelWhether')}
        {...this.props}
        visible={isShowModal}
        onClose={this.onCloseModal}
        DialogClass='delete-wrapper'
      >
        <div className="delete-container">
          <p className="confirmDelTip">{I18n.t('confirmDelTip')}</p>
          <Button className="btn-confirm" onClick={this.confirmDelete}>{I18n.t('confirmDel')}</Button>
        </div>
      </Modal>
    )
  } 
}

const mapStateToProps = (state) => ({
  isShowModal: state.ui.isShowModal,
})

Modal.Modal1 = connect(mapStateToProps)(Modal1)

export default Modal
