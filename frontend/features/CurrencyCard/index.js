import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';
import Svg from '../Svg';

const CurrencyCard = ({ currency }) => (
  <article className="currency-card">
    <Link href={`/currency?slug=${currency.slug}`} as={`/currencies/${currency.slug}`}>
      <a className="currency-card__inner">
        <span style={{
          width: '2.4rem', height: '2.4rem', display: 'block', marginRight: '1rem',
        }}>
          <Svg flag={currency.slug}/>
        </span>
        <h3 className="currency-card__label">{currency.tVO.fields.name}</h3>
        <span className="currency-card__slug">{currency.slug}</span>
      </a>
    </Link>
  </article>
);

export default CurrencyCard;
