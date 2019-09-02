import './styles.scss';
import React from 'react';

const RateCard = ({ value, label, info }) => (
  <p className="rate-card">
    <b className="rate-card__value">{value}</b>
    <strong className="rate-card__label">{label}</strong>
    <i className="rate-card__info">{info}</i>
  </p>
);

export default RateCard;
