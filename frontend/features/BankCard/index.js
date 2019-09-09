import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';

const BankCard = ({ bank }) => (
  <article className="bank-card">
    <Link href={`/bank?slug=${bank.slug}`} as={`/banks/${bank.slug}`}>
      <a className="bank-card__inner">
        <h3 className="bank-card__label">{bank.name}</h3>
        <span className="bank-card__slug">{bank.slug}</span>
      </a>
    </Link>
  </article>
);

export default BankCard;
