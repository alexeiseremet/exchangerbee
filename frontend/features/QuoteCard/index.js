import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';

const QuoteCard = ({
  label, centralBankItem, link, children,
}) => {
  const renderInner = () => (
    <article className="quote-card__inner">
      <h6 className="quote-card__label">
        {label}
      </h6>

      {
        React.Children.map(children, (child, i) => (
          <div className={`quote-card__rate quote-card__rate--${centralBankItem === i ? 'central' : 'commercial'}`}>
            {React.cloneElement(child)}
          </div>
        ))
      }
    </article>
  );

  if (!link) {
    return (
      <section className="quote-card">
        {renderInner()}
      </section>
    );
  }

  return (
    <Link {...link}>
      <a className="quote-card quote-card--link">
        {renderInner()}
      </a>
    </Link>
  );
};

export default QuoteCard;
