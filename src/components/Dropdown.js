import React, { Component } from 'react'

import './Dropdown.scss'

type Props = {

}

class Dropdown extends Component<Props> {
  constructor(props) {
    super(props)
    const { items } = props
    this.state = {
      selected: items && items[0],
      isShowing: false,
    }
  }

  select = (itemIdx) => () => {
    const { items, onClick } = this.props
    const selectedItem = items[itemIdx]
    this.setState({
      selected: selectedItem,
    })
    onClick(selectedItem.value)
  }

  toggleMenu = () => {
    this.setState({
      isShowing: !this.state.isShowing,
    })
  }

  render() {
    const { selected, isShowing }  = this.state
    const { items } = this.props
    return (
      <div
        className="Dropdown"
        onClick={this.toggleMenu}
      >
        <div className="Dropdown__currentItem" >
          {selected.label}
        </div>
        {isShowing && (
          <div className="Dropdown__menu">
            {items.map(({ label, value }, itemIdx) => (
              <div
                key={label}
                className="Dropdown__menuItem"
                onClick={this.select(itemIdx)}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}

export default Dropdown
