import React from 'react'
import cx from 'classnames'
import './index.scss'


const Landing = (props) => (
  <div className={cx('Landing', props.className)}>
    <img className="Landing__logo" src="/static/images/logo.png" />
    <h2 className="logo-title">I O S T</h2>
  </div>
)

export default Landing
