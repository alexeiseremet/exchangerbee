import './styles.scss'
import React from 'react'
import Loading from 'Features/Loading'
import VisibilitySensor from 'react-visibility-sensor'

export default ({hasMore, loadMore}) => {
  if (!hasMore) {
    return null
  }
  const onChange = isVisible => isVisible && loadMore()

  return (
    <VisibilitySensor onChange={onChange} intervalDelay={1000}>
      <div className="pagination">
        <div className="pagination__items">
          <Loading/>
        </div>
      </div>
    </VisibilitySensor>
  )
}
