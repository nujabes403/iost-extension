import React from 'react'

import './popup-index.scss'

const AskPopupDetail = ({
  abi = '',
  contractAddress = '',
  args = [],
}) => (
  <div className="AskPopupDetail">
    <label className="AskPopupDetail__label">contract address:</label>
    <p className="AskPopupDetail__contract">
      {contractAddress}
    </p>
    <label className="AskPopupDetail__label">action: </label>
    <span className="AskPopupDetail__abi">{abi}</span>
    <label className="AskPopupDetail__label">arguments: </label>
    <span className="AskPopupDetail__args">{args.map( (arg,i) => <span key={i}>{arg}</span>)}</span>
  </div>
)

export default AskPopupDetail
