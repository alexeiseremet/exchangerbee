import React from 'react';

export default ({ children }) => (
  <header className="layout__header-wrapper is-fixed" role="banner">
    <div className="layout__header">
      <div className="layout__header-inner">
        {children}
      </div>
    </div>
  </header>
);
