import React from 'react';

export default ({
  className, glyph, icon, ...restProps
}) => (
  <svg className={className} {...restProps} role="img">
    <use xlinkHref={icon ? `#icon-${icon}--sprite` : `#${glyph}`} />
  </svg>
);
