import React, { Component } from 'react'
import QRCode from 'qrcode.react'

import './AccountQRCode.scss'

type Props = {

}

class AccountQRCode extends Component<Props> {
  render() {
    const { value } = this.props
    return (
      <div className="AccountQRCode">
        <QRCode value={value} />
        <p className="AccountQRCode__description">
          Share it to your friends! <br />
          This QR code contains your account name({value}). <br />
          They can use this qrcode for transferring token to your account. <br />
        </p>
      </div>
    )
  }
}

export default AccountQRCode
