import React from 'react'
import cx from 'classnames'
import './index.scss'


const Landing = (props) => (
  <div className={cx('Landing', props.className)}>
    <img className="Landing__logo" src="/static/images/logo-home.png" />
  </div>
)

export default Landing
