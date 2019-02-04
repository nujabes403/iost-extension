import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'

import PledgerList from 'components/PledgerList'

import './UnpledgeGas.scss'

type Props = {

}

class UnpledgeGas extends Component<Props> {
  render() {
    const { pledged_info } = this.props
    return (
      <div className="UnpledgeGas">
        <p className="UnpledgeGas__explanation">
          <p>{I18n.t('currentlyYouArePledging', { length: pledged_info.length })}</p>
          <p>{I18n.t('unpledgeAndGetBackYourIOST')}</p>
          <p>{I18n.t('makeSureThatAfterUnpledging')}</p>
          <p>- {I18n.t('unpledgingDestroyGas')}</p>
          <p>- {I18n.t('unpledgingFreezeIOST')}</p>
          <p>*pledger: the account receiving the deposit</p>
        </p>
        <PledgerList pledged_info={pledged_info} />
      </div>
    )
  }
}

export default UnpledgeGas
