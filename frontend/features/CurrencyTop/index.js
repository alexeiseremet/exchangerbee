import './styles.scss';
import React from 'react';
import { baseCountry, baseCurrency, centralBank } from '../../server.config';
import RateCard from '../RateCard';
import { localeDate } from '../../lib/moment';

const CurrencyTop = ({
  currency, centralQuote, bestBid, bestAsk,
}) => (
  <section className="currency-top">
    <table className="currency-top__table">
      <caption dangerouslySetInnerHTML={{
        __html: `
          Cursul oficial şi cele mai bune rate de schimb pentru ${currency.name} 
          oferite de băncile din <span style="white-space: nowrap">${baseCountry.name}, ${localeDate()}</span>
        `,
      }}/>
      <tbody>
      <tr>
        <th className="currency-top__label">
          <strong
            title={currency.name}
            style={{
              fontFamily: 'Georgia, Lucida Bright, serif',
              fontStyle: 'italic',
              fontSize: '3rem',
            }}
          >
            {currency.slug}
          </strong>
        </th>
        <td className="currency-top__rate currency-top__rate--central">
          <RateCard
            key="central"
            value={centralQuote.bid}
            label={String(centralBank.slug).toUpperCase()}
            info={baseCurrency.symbol}
            type="large"
          />
        </td>
        <td className="currency-top__rate currency-top__rate--commercial">
          <RateCard
            key="bid"
            value={bestBid.bid}
            label={bestBid.institutionVObj.name}
            info={'cumpără'}
          />
        </td>
        <td className="currency-top__rate currency-top__rate--commercial">
          <RateCard
            key="ask"
            value={bestAsk.ask}
            label={bestAsk.institutionVObj.name}
            info={'vinde'}
          />
        </td>
      </tr>
      </tbody>
    </table>
  </section>
);

export default CurrencyTop;
