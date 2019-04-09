import React from 'react'
import TabsNav from './_nav'
import TabsPanels from './_panels'

class Tabs extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      activeIndex: props.activeIndex || 0,
    }
  }

  handlerOnClick = index => {
    this.setState({activeIndex: index})
  }

  render () {
    const {items} = this.props
    const {activeIndex} = this.state

    if (items && !items.length) {
      return null
    }

    return (
      <div className="tabs">
        <div className="tabs__nav" role="tablist">
          <TabsNav
            items={items}
            activeIndex={activeIndex}
            onClick={this.handlerOnClick}
          />

          <div className="tabs__panels">
            <TabsPanels
              items={items}
              activeIndex={activeIndex}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default Tabs
