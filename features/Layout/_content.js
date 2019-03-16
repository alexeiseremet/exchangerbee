import React from 'react'

export default ({children}) => (
  <main className="layout__content-wrapper" role="main">
    <div className="layout__content">
      <div className="layout__content-inner">
        {children}
      </div>
    </div>
  </main>
)
