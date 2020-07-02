import './styles.scss';
import React from 'react';

export default ({ type, children, ...restProps }) => {
  switch (type) {
    case 'dl':
      return (
        <dl {...restProps}>{children}</dl>
      );

    case 'ordered':
      return (
        <ol className="ordered-list" {...restProps}>{children}</ol>
      );

    case 'unordered':
    default:
      return (
        <ul className="unordered-list" {...restProps}>{children}</ul>
      );
  }
};
