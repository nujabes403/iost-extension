import React from 'react'

import './popup-index.scss'

const AskPopupSummary = ({
  abi = '',
  contractAddress = '',
  args = [],
}) => (
  <div className="AskPopupSummary">
    <div className="AskPopupSummary__description">
      You will call <span className="AskPopupSummary__item AskPopupSummary__item--abi">'{abi}'</span> action <br/>
      on contract <p className="AskPopupSummary__item AskPopupSummary__item--contractAddress">'{contractAddress}'</p>
      with following arguments:&nbsp;
      <span className="AskPopupSummary__item AskPopupSummary__item--args">
        [{args.map((arg,i) => <span key={i}> {arg} </span>)}]
      </span>
    </div>
  </div>
)

export default AskPopupSummary
