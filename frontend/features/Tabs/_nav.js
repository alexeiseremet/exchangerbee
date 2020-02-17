import './styles.scss';
import React from 'react';
import classnames from 'classnames';

export default ({ items, activeIndex, onClick }) => (
  items.map((nav, index) => (
    <button
      className={
        classnames(
          'tabs__nav-button',
          {
            'is-active': index === activeIndex,
            'is-disabled': nav.disabled,
          },
        )
      }
      aria-controls={nav.id}
      aria-selected={index === activeIndex}
      tabIndex={index === activeIndex ? 0 : -1}
      key={nav.id}
      onClick={() => onClick(index)}
      role="tab"
      type="button"
    >
      <span className="tabs__nav-label">{nav.label}</span>
    </button>
  ))
);
