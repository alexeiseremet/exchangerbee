import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';

const QuoteCard = ({
  label, centralBankItem, link, children, style,
}) => {
  const renderInner = () => (
    <>
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
    </>
  );

  if (!link) {
    return (
      <article className="quote-card" style={style}>
        <div className="quote-card__inner" style={style} title={label}>
          {renderInner()}
        </div>
      </article>
    );
  }

  return (
    <article className="quote-card quote-card--link" style={style}>
      <Link {...link}>
        <a className="quote-card__inner" title={label}>
          {renderInner()}
        </a>
      </Link>
    </article>
  );
};

export default QuoteCard;
