import React, { Component } from 'react'

import Input from 'components/Input'
import { DEFAULT_TOKEN_LIST } from 'constants/token'

import './TokenSelector.scss'

type Props = {

}

class TokenSelector extends Component<Props> {
  state = {
    search: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render() {
    return (
      <div className="TokenSelector">
        <Input
          className="TokenSelector__search"
          placeholder="Search your token"
        />
        <div className="TokenSelector__tokenList">
          {DEFAULT_TOKEN_LIST.map(token =>
            <div className="TokenSelector__tokenListItem">{token.name}</div>
          )}
        </div>
      </div>
    )
  }
}

export default TokenSelector
