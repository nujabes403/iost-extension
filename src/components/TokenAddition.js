import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'

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
    chrome.storage.local.set({ savedTokenSymbols: newTokenSymbolList })
    token.updateSavedTokenSymbols(newTokenSymbolList)
  }

  render() {
    return (
      <div className="TokenAddition">
        <p className="TokenAddition__description">
          {I18n.t('pleaseAddToken')}
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
