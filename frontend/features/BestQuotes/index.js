import './styles.scss';
import React from 'react';
import RateCard from '../RateCard';
import QuoteCard from '../QuoteCard';

const BestQuotes = ({
  centralQuote, bestBidQuote, bestAskQuote, baseCurrenciesArr,
}) => (
  <section className="best-quotes">
    {
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
              centralQuote && centralQuote.map((quote) => (
                quote.currencyVObj.slug === slug && (
                  <RateCard
                    key="central"
                    value={quote.bid}
                    label={String(quote.institutionVObj.slug).toUpperCase()}
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
                    info={'cumpără'}
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
                    info={'vinde'}
                  />
                )
              ))
            }
          </>
        </QuoteCard>
      ))
    }
  </section>
);

export default BestQuotes;
