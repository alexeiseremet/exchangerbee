import './styles.scss';
import React from 'react';
import { Link } from '../../lib/i18n';
import { baseCurrenciesArr, centralBank } from '../../server.config';
import RateCard from '../RateCard';

const BestQuotes = ({ centralQuote, bestBidQuote, bestAskQuote }) => (
  <section className="best-quotes">
    {
      centralQuote && baseCurrenciesArr.map((slug, i) => (
        <article key={i} className="best-quotes__item">
          <Link
            href={`/currency?slug=${slug}`}
            as={`/currencies/${slug}`}
          >
            <a className="best-quotes__card">
              <h6 className="best-quotes__slug">
                {slug}
              </h6>

              {
                centralQuote.map((quote, j) => {
                  if (quote.currencyVObj.slug !== slug) {
                    return null;
                  }

                  return (
                    <div key={j} className="best-quotes__rate best-quotes__rate--central">
                      <RateCard value={quote.bid} label="+1.003" info={centralBank.slug} />
                    </div>
                  );
                })
              }

              {
                bestBidQuote && bestBidQuote.map((quote, j) => {
                  if (quote.currencyVObj.slug !== slug) {
                    return null;
                  }

                  return (
                    <div key={j} className="best-quotes__rate">
                      <RateCard
                        value={quote.bid}
                        label={quote.institutionVObj.name}
                        info="cumpărare"
                      />
                    </div>
                  );
                })
              }

              {
                bestAskQuote && bestAskQuote.map((quote, j) => {
                  if (quote.currencyVObj.slug !== slug) {
                    return null;
                  }

                  return (
                    <div key={j} className="best-quotes__rate">
                      <RateCard
                        value={quote.ask}
                        label={quote.institutionVObj.name}
                        info="vânzare"
                      />
                    </div>
                  );
                })
              }
            </a>
          </Link>
        </article>
      ))
    }
  </section>
);

export default BestQuotes;
