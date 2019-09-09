import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';

const QuoteCard = ({
  label, centralBankItem, link, children,
}) => (
  <Link {...link}>
    <a className="quote-card">
      <article className="quote-card__inner">
        <h6 className="quote-card__label">
          {label}
        </h6>

        {
          React.Children.map(children, (child, i) => (
            <div className={`quote-card__rate ${centralBankItem === i ? 'quote-card__rate--central' : ''}`}>
              {React.cloneElement(child)}
            </div>
          ))
        }
      </article>
    </a>
  </Link>
);

export default QuoteCard;
