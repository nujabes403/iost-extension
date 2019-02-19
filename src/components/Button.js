import React from 'react'
import cx from 'classnames'

import LoadingImage from 'components/LoadingImage'

import './Button.scss'

type Props = {

}

const Button = (props) => (
  <button {...props} className={cx('Button', props.className, {'btn-account': props.account})}>
    {props.children}
    {props.isLoading && <LoadingImage />}
  </button>
)

export default Button
