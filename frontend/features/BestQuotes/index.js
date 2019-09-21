import './styles.scss';
import React from 'react';
import { baseCurrenciesArr, baseCurrency, centralBank } from '../../server.config';
import RateCard from '../RateCard';
import QuoteCard from '../QuoteCard';

const BestQuotes = ({ centralQuote, bestBidQuote, bestAskQuote }) => (
  <section className="best-quotes">
    {
      centralQuote ? (
        baseCurrenciesArr.map((slug) => (
          <QuoteCard
            key={slug}
            label={slug}
            centralBankItem={0}
            link={{
              href: `/currency?slug=${slug}`,
              as: `/currencies/${slug}`,
            }}
          >
            <>
              {
                centralQuote.map((quote) => (
                  quote.currencyVObj.slug === slug && (
                    <RateCard
                      key="central"
                      value={quote.bid}
                      label={String(centralBank.slug).toUpperCase()}
                      info={String(baseCurrency.slug).toUpperCase()}
                    />
                  )
                ))
              }
            </>

            <>
              {
                bestBidQuote && bestBidQuote.map((quote) => (
                  quote.currencyVObj.slug === slug && (
                    <RateCard
                      key="bid"
                      value={quote.bid}
                      label={quote.institutionVObj.name}
                      info="cumpărare"
                    />
                  )
                ))
              }
            </>

            <>
              {
                bestAskQuote && bestAskQuote.map((quote) => (
                  quote.currencyVObj.slug === slug && (
                    <RateCard
                      key="ask"
                      value={quote.ask}
                      label={quote.institutionVObj.name}
                      info="vânzare"
                    />
                  )
                ))
              }
            </>
          </QuoteCard>
        ))
      ) : 'Nu exista date'
    }
  </section>
);

export default BestQuotes;
