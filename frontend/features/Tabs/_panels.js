import './styles.scss'
import React from 'react'

export default ({items, activeIndex}) => (
  items.map((tab, index) => (
    <div
      id={tab.id}
      className="tabs__body"
      tabIndex={index === activeIndex ? 0 : -1}
      hidden={index !== activeIndex}
      key={tab.id}
      role="tabpanel"
    >
      {tab.content}
    </div>
  ))
)
