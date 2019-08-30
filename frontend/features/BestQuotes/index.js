import './styles.scss'
import React from 'react'
import { Link } from '../../lib/i18n'
import { baseCurrenciesArr, centralBank } from '../../server.config'

const BestQuotes = ({centralQuote, bestBidQuote, bestAskQuote}) => (
  <section className="best-quotes">
    {
      centralQuote && baseCurrenciesArr.map((slug, i) => (
        <article key={i} className="best-quotes__item">
          <Link href={`/currency?slug=${slug}`}
                as={`/currencies/${slug}`}
          >
            <a className="best-quotes__card">
              <h6 className="best-quotes__slug">
                {slug}
              </h6>

              {
                centralQuote.map((quote, i) => {
                  if (quote.currencyVObj.slug !== slug) {
                    return null;
                  }

                  return (
                    <p key={i} className="best-quotes__rate best-quotes__rate--central">
                      <b className="best-quotes__rate-value">{quote.bid}</b>
                      <strong className="best-quotes__rate-diff">+1.003</strong>
                      <i className="best-quotes__rate-info">{centralBank}</i>
                    </p>
                  );
                })
              }

              {
                bestBidQuote && bestBidQuote.map((quote, i) => {
                  if (quote.currencyVObj.slug !== slug) {
                    return null;
                  }

                  return (
                    <p key={i} className="best-quotes__rate">
                      <b className="best-quotes__rate-value">{quote.bid}</b>
                      <strong className="best-quotes__rate-diff">{quote.institutionVObj.name}</strong>
                      <i className="best-quotes__rate-info">{'cumpărare'}</i>
                    </p>
                  )
                })
              }

              {
                bestAskQuote && bestAskQuote.map((quote, i) => {
                  if (quote.currencyVObj.slug !== slug) {
                    return null;
                  }

                  return (
                    <p key={i} className="best-quotes__rate">
                      <b className="best-quotes__rate-value">{quote.ask}</b>
                      <strong className="best-quotes__rate-diff">{quote.institutionVObj.name}</strong>
                      <i className="best-quotes__rate-info">{'vânzare'}</i>
                    </p>
                  )
                })
              }
            </a>
          </Link>
        </article>
      ))
    }
  </section>
);

export default BestQuotes
