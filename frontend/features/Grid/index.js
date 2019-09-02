import './styles.scss';
import React from 'react';
import classnames from 'classnames';
import Loading from '../Loading';

export default (props) => {
  const {
    gutter = 'sm',
    children, colsXs, colsSm,
    colsMd, colsLg,
  } = props;
  const colClasses = classnames(
    'grid',
    {
      [`grid--gutter-${gutter}`]: gutter,
      [`grid--col-${colsXs}@xsmall`]: colsXs,
      [`grid--col-${colsSm}@small`]: colsSm,
      [`grid--col-${colsMd}@medium`]: colsMd,
      [`grid--col-${colsLg}@large`]: colsLg,
    },
  );

  if (!children) {
    return <Loading />;
  }

  return (
    <div className={colClasses}>
      {
        children.map((item, i) => (
          <div className="grid__col" key={i}>{item}</div>
        ))
      }
    </div>
  );
};
