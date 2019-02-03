import React, { Component } from 'react'

import PledgerList from 'components/PledgerList'
import Input from 'components/Input'
import Button from 'components/Button'
import LoadingImage from 'components/LoadingImage'
import iost from 'iostJS/iost'

import './GasPledge.scss'

type Props = {

}

class GasPledge extends Component<Props> {
  state = {
    isLoading: false,
    pledgeAmount: '',
    pledgeForWho: '',
    isShowPledgerList: false,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  togglePledgerList = () => {
    this.setState({
      isShowPledgerList: !this.state.isShowPledgerList,
    })
  }

  pledgeToken = () => {
    const { pledgeAmount, pledgeForWho } = this.state
    const ID = iost.account.getID()

    iost.sendTransaction('gas.iost', 'pledge', [ID, pledgeForWho || ID, pledgeAmount])
      .onPending(console.log)
      .onSuccess(console.log)
      .onFailed(console.log)

  }

  render() {
    const { isLoading, isShowPledgerList } = this.state
    const { gasInfo } = this.props
    const { increase_speed, pledged_info } = gasInfo

    const currentlyPledgingGas = pledged_info.reduce((acc, cur) => {
      acc += cur.amount
      return acc
    }, 0)
    
    return (
      <div className="GasPledge">
        Currently you're pledging {currentlyPledgingGas} IOST.
        You're generating {increase_speed} IOST per 1 second.
        Do you need more GAS? You can get and generate GAS by pledging IOST token.
        Don't worry, you can get back your IOST token immediately by unpledging.
        <Input
          name="pledgeAmount"
          onChange={this.handleChange}
        />
        <Button
          className="GasPledge__pledgeButton"
          onClick={this.pledgeToken}
        >
          Pledge
        </Button>
        {isLoading && <LoadingImage />}
        <p onClick={this.togglePledgerList}>
          Show pledged info detail.
        </p>
        {isShowPledgerList && (
          <PledgerList pledged_info={pledged_info} />
        )}
      </div>
    )
  }
}

export default GasPledge
