import React, { Component } from 'react'

import Button from 'components/Button'
import LoadingImage from 'components/LoadingImage'
import iost from 'iostJS/iost'

import './PledgerList.scss'

type Props = {

}

class PledgerList extends Component<Props> {
  state = {
    isLoading: false,
  }

  unpledge = (pledger, amount) => () => {
    const ID = iost.account.getID()
    iost.sendTransaction('gas.iost', 'unpledge', [ID, pledger, amount])
      .onPending((pending) => {
        console.log(pending)
        this.setState({
          isLoading: true,
        })
      })
      .onSuccess((success) => {
        console.log(success)
        this.setState({
          isLoading: false
        })
      })
      .onFailed((failed) => {
        console.log(failed)
        this.setState({
          isLoading: false
        })
      })
  }

  render() {
    const { isLoading } = this.state
    const { pledged_info } = this.props
    return (
      <div className="PledgerList">
        {pledged_info.map(({ pledger, amount }) => {
          return (
            <div className="PledgerList__item">
              <p className="PledgerList__itemDescription">pledger: {pledger} / amount: {amount}</p>
              <Button onClick={this.unpledge(pledger, String(amount))}>Unpledge</Button>
              {isLoading && <LoadingImage />}
            </div>
          )
        })}
        {!!pledged_info
          ? <p className="PledgerList__additionalInfo">*pldger: the account receiving the deposit</p>
          : <p className="PledgerList__additionalInfo">You're not pledging</p>
        }
      </div>
    )
  }
}

export default PledgerList
