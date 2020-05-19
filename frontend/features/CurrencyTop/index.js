import './styles.scss';
import React from 'react';
import { withTranslation } from '../../lib/i18n';
import RateCard from '../RateCard';

const CurrencyTop = ({
  t, currency, centralQuote, bestBid, bestAsk,
  centralBank, baseCurrency, trans,
}) => (
    <section className="currency-top">
      <table className="currency-top__table">
        <caption dangerouslySetInnerHTML={{
          __html: t('Curs {{tCBS}} şi cele mai bune rate de schimb pentru {{tCN}} la băncile din {{tBCN}}',
            { ...trans }),
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
              info={t('cumpără')}
            />
          </td>
          <td className="currency-top__rate currency-top__rate--commercial">
            <RateCard
              key="ask"
              value={bestAsk.ask}
              label={bestAsk.institutionVObj.name}
              info={t('vinde')}
            />
          </td>
        </tr>
        </tbody>
      </table>
    </section>
);

export default withTranslation()(CurrencyTop);
