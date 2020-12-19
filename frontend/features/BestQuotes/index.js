import './styles.scss';
import React from 'react';
import { withTranslation } from '../../lib/i18n';
import RateCard from '../RateCard';
import QuoteCard from '../QuoteCard';

const BestQuotes = (props) => {
  const {
    t, link, centralQuote, bestBidQuote, bestAskQuote, baseCurrenciesArr,
  } = props;

  return (
    <section className="best-quotes">
      {
        baseCurrenciesArr.map((slug) => (
          <QuoteCard
            key={slug}
            label={slug}
            slug={slug}
            centralBankItem={0}
            link={
              link === 'no-link'
                ? null
                : {
                  href: `/currency?slug=${slug}`,
                  as: `/currencies/${slug}`,
                }
            }
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
                      label={quote.institutionVObj.tVO.fields.name}
                      info={t('cumpără')}
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
                      label={quote.institutionVObj.tVO.fields.name}
                      info={t('vinde')}
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
};

export default withTranslation()(BestQuotes);
