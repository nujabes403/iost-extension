import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import { I18n } from 'react-redux-i18n'
import { Header } from 'components'
import Button from 'components/Button'

import './index.scss'

type Props = {

}

class TokenTransferSuccess extends Component<Props> {
  componentDidMount() {
    console.log(this.props.transferInfo)
  }
  moveTo = (location) => () => {
    const { changeLocation } = this.props
    changeLocation(location)
  }

  render() {
    const { transferInfo: tx } = this.props

    return (
      <Fragment>
        <Header title={I18n.t('transferResult')} onBack={this.moveTo('/account')} hasSetting={false} />
        <div className="success-box">
          <div className="success-logo-box">
            <i className="success-logo" />
            <p className="success-result">{I18n.t('transferSuccess')}</p>
          </div>
          <div className="item-box">
            <p className="item-title">{I18n.t('txid')}</p>
            <p className="item-content item-txHash">{tx.tx_hash}</p>
          </div>
          <div className="item-box">
            <p className="item-title">{I18n.t('gasUsage')}</p>
            <p className="item-content item-gasUsage">{tx.gas_usage} {I18n.t('iGAS')}</p>
          </div>
          <Button className="btn-close" onClick={this.moveTo('/account')}>{I18n.t('transferClose')}</Button>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  transferInfo: state.ui.transferInfo,
})

export default connect(mapStateToProps)(TokenTransferSuccess)
