import React, { Component } from 'react'
import { I18n } from 'react-redux-i18n'
import cx from 'classnames'

import './Tab.scss'

type Props = {

}

const TabHeader = ({
  headerItems,
  changeActiveTab,
  activeTabKey,
}) => {
  const width = (100 / headerItems.length).toFixed(2) + '%'

  return (
    <div className="Tab__header">
      {headerItems.map((tabKey) => (
        <span
          className={cx('Tab__headerItem', {
            'Tab__headerItem--active': tabKey === activeTabKey
          })}
          style={{ width: width }}
          onClick={changeActiveTab(tabKey)}
        >
          {I18n.t(tabKey)}
        </span>
      ))}
    </div>
  )
}

const TabItem = ({
  content,
}) => (
  <div className="Tab__item">
    {content}
  </div>
)

class Tab extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      activeTabKey: Object.keys(props.tabDict)[0]
    }
  }

  changeActiveTab = (tabKey) => () => {
    this.setState({
      activeTabKey: tabKey
    })
  }

  render() {
    const { activeTabKey } = this.state
    const { tabDict } = this.props
    return (
      <div className="Tab">
        <TabHeader
          activeTabKey={activeTabKey}
          headerItems={Object.keys(tabDict)}
          changeActiveTab={this.changeActiveTab}
        />
        <TabItem content={tabDict[activeTabKey]} />
      </div>
    )
  }
}

export default Tab
