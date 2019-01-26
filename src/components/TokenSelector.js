import React, { Component } from 'react'
import { connect } from 'react-redux'

import Input from 'components/Input'
import TokenAddition from 'components/TokenAddition'

import ui from 'utils/ui'
import token from 'utils/token'

import './TokenSelector.scss'

type Props = {

}

class TokenSelector extends Component<Props> {
  state = {
    search: '',
    isLoading: true,
  }

  componentDidMount() {
    chrome.storage.sync.get(['savedTokenSymbols'], (result) => {
      this.setState({ isLoading: false })
      if (!result.savedTokenSymbols instanceof Array) return
      token.updateSavedTokenSymbols(result.savedTokenSymbols)
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  selectToken = (symbol) => () => {
    token.selectToken(symbol)
    ui.closePopup()
  }

  deleteToken = (idx) => (e) => {
    e.stopPropagation()
    const { tokenSymbols } = this.props
    const newTokenSymbols = [
      ...tokenSymbols.slice(0, idx),
      ...tokenSymbols.slice(idx + 1)
    ]
    chrome.storage.sync.set({ savedTokenSymbols: newTokenSymbols })
    token.updateSavedTokenSymbols(newTokenSymbols)
  }

  render() {
    const { isLoading, search } = this.state
    const { tokenSymbols } = this.props
    return (
      <div className="TokenSelector">
        <Input
          name="search"
          onChange={this.handleChange}
          className="TokenSelector__search"
          placeholder="Search your token"
        />
        <div className="TokenSelector__tokenList">
          {tokenSymbols
            .filter((token) => RegExp(search).test(token.symbol))
            .map((token, idx) =>
            <div
              className="TokenSelector__tokenListItem"
              onClick={this.selectToken(token.symbol)}
            >
              {token.symbol}
              <span
                className="TokenSelector__deleteButton"
                onClick={this.deleteToken(idx)}
              />
            </div>
          )}
        </div>
        <TokenAddition />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  tokenSymbols: state.token.savedTokenSymbols,
})

export default connect(mapStateToProps)(TokenSelector)
