import React from 'react';

export default ({
  className, glyph, icon, ...restProps
}) => (
  <svg className={className} {...restProps}>
    <use xlinkHref={icon ? `#icon-${icon}--sprite` : `#${glyph}`} />
  </svg>
);
