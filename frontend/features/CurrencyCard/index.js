import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';

const CurrencyCard = ({ currency }) => (
  <article className="currency-card">
    <Link href={`/currency?slug=${currency.slug}`} as={`/currencies/${currency.slug}`}>
      <a className="currency-card__inner">
        <h3 className="currency-card__label">{currency.tVO.fields.name}</h3>
        <span className="currency-card__slug">{currency.slug}</span>
      </a>
    </Link>
  </article>
);

export default CurrencyCard;
