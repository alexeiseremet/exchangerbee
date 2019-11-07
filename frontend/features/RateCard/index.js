import './styles.scss';
import React from 'react';
import classnames from 'classnames';

const RateCard = ({
  value, label, info, type = null,
}) => {
  const classes = classnames(
    'rate-card',
    {
      [`rate-card--${type}`]: type,
    },
  );

  return (
    <div className={classes}>
      <b className="rate-card__value">
        {
          Number(value).toString().length < 5
            ? Number(value).toFixed(2)
            : Number(value)
        }
      </b>
      {label && <strong className="rate-card__label">{label}</strong>}
      {info && <i className="rate-card__info">{info}</i>}
    </div>
  );
};

export default RateCard;
