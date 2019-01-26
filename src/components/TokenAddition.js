import React, { Component } from 'react'

import Input from 'components/Input'
import Button from 'components/Button'
import token from 'utils/token'

import './TokenAddition.scss'

type Props = {

}

class TokenAddition extends Component<Props> {
  state = {
    tokenSymbol: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  addToken = () => {
    const { tokenSymbol } = this.state
    const { updateSavedTokenSymbols } = this.props
    const tokenSymbols = token.getTokenSymbols()

    const newTokenSymbolList = [...tokenSymbols, { symbol: tokenSymbol }]
    chrome.storage.sync.set({ savedTokenSymbols: newTokenSymbolList })
    token.updateSavedTokenSymbols(newTokenSymbolList)
  }

  render() {
    return (
      <div className="TokenAddition">
        <p className="TokenAddition__description">
          If you can't find your token on the list, please add it!
        </p>
        <Input
          name="tokenSymbol"
          onChange={this.handleChange}
          placeholder="Write token symbol to add..."
          className="TokenAddition__input"
        />
        <Button
          className="TokenAddition__addButton"
          onClick={this.addToken}
        >
        Add
        </Button>
      </div>
    )
  }
}

export default TokenAddition
