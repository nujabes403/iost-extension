import React, { Component, Fragment } from 'react'

import Button from 'components/Button'
import LoadingImage from 'components/LoadingImage'
import TransactionSuccess from 'components/TransactionSuccess'
import TransactionFailed from 'components/TransactionFailed'
import ui from 'utils/ui'
import iost from 'iostJS/iost'

import './PledgerList.scss'

type Props = {

}

class PledgerList extends Component<Props> {
  state = {
    isLoading: false,
    activeItem: '',
  }

  unpledge = (pledger, amount) => () => {
    const ID = iost.account.getID()
    iost.sendTransaction('gas.iost', 'unpledge', [ID, pledger, amount])
      .onPending(() => {
        this.setState({
          isLoading: true,
        })
      })
      .onSuccess((response) => {
        this.setState({ isLoading: false })
        ui.openPopup({ content: <TransactionSuccess tx={response} /> })
      })
      .onFailed((err) => {
        this.setState({ isLoading: false })
        ui.openPopup({ content: <TransactionFailed tx={err} /> })
      })
  }

  setActiveItem = (pledger) => () => {
    this.setState({
      activeItem: pledger,
    })
  }

  render() {
    const { isLoading, activeItem } = this.state
    const { pledged_info } = this.props
    return (
      <div className="PledgerList">
        {pledged_info.map(({ pledger, amount }) => {
          return (
              <div
                className="PledgerList__item"
                onClick={this.setActiveItem(pledger)}
              >
                <div className="PledgerList__itemInner">
                  <p className="PledgerList__itemDescription">pledger: {pledger}</p>
                  <p className="PledgerList__itemDescription">amount: {amount}</p>
                </div>
                {activeItem === pledger && (
                  <Fragment>
                    <Button className="PledgerList__unpledgeButton" onClick={this.unpledge(pledger, String(amount))}>Unpledge</Button>
                    {isLoading && <LoadingImage />}
                  </Fragment>
                )}
              </div>
          )
        })}
      </div>
    )
  }
}

export default PledgerList
