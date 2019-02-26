import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { I18n } from 'react-redux-i18n'

import { Header } from 'components'
import ui from 'utils/ui';
import './index.scss'

type Props = {

}

class UserAgreement extends Component<Props> {
  backTo = () => {
    const { changeLocation, locationList } = this.props
    ui.deleteLocation()
    changeLocation(locationList[locationList.length - 1])
  }
  render() {
    return (
      <Fragment>
        <Header title={I18n.t('AboutIOST_userAgreement')} onBack={this.backTo} hasSetting={false} />
        <div className="userAgreement-box">
          <div className="userAgreement-wrapper">
            <ul>
              {
                [...Array(40).keys()].map((item, index) => <li key={index}>{item}</li>)
              }
            </ul>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  locationList: state.ui.locationList,
})

export default connect(mapStateToProps)(UserAgreement)
