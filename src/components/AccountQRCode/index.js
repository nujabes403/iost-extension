import React, { Component, Fragment } from 'react'
import { Header } from 'components'
import { I18n } from 'react-redux-i18n'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import QRCode from 'qrcode.react'
import Button from 'components/Button'
import iost from 'iostJS/iost'


import './index.scss'

type Props = {

}

class AccountQRCode extends Component<Props> {
  onCopy = () => {
    console.log('复制成功')
  }
  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }
  render() {
    const value = iost.account.getID()
    return (
      <Fragment>
        <Header title={I18n.t('receipt')} onBack={this.moveTo('/account')} />
        <div className="accountQRCode-box">
          <p className="qrTitle">{I18n.t('qrTitle')}</p>
          <QRCode value={value} />
          <p className="name">{value}</p>
          <CopyToClipboard onCopy={this.onCopy} text={value}>
            <Button
              className="btn-copyAddress"
              onClick={this.moveTo('/accountQRCode')}
            >
              {I18n.t('copyAddress')}
            </Button>
          </CopyToClipboard>
          <p className="receiptTips">{I18n.t('receiptTips')}</p>
        </div>
      </Fragment>

    )
  }
}

export default AccountQRCode
