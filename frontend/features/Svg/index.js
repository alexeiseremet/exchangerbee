import React from 'react';
import './_flags';

export default ({
  className, glyph, icon, flag, ...restProps
}) => {
  let xlinkHref;

  if (icon) xlinkHref = `#icon-${icon}--sprite`;
  if (glyph) xlinkHref = `#${glyph}`;
  if (flag) xlinkHref = `#${flag}--sprite`;

  return (
    <svg className={className} {...restProps} role="img">
      <use xlinkHref={xlinkHref}/>
    </svg>
  );
};
