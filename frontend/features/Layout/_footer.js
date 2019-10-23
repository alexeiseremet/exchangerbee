import React from 'react';

export default ({ children }) => (
  <footer className="layout__footer-wrapper" role="contentinfo">
    <div className="layout__footer">
      <div className="layout__footer-inner">
        {children}
      </div>
    </div>
  </footer>
);
