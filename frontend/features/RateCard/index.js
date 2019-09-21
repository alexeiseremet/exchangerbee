import './styles.scss';
import React from 'react';

const RateCard = ({ value, label, info }) => (
  <div className="rate-card">
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

export default RateCard;
