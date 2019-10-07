import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { centralBank, baseCurrency, baseCurrenciesArr } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import ConverterCard from '../features/ConverterCard';

class ConverterPageMarkup extends React.Component {
  state = {
    baseAmount: null,
    payCurrencySlug: baseCurrenciesArr[0],
    payValue: 100,
    payBid: null,
    payAsk: null,
  };

  selectCurrency = (slug) => {
    this.setState({
      payCurrencySlug: slug,
    });
  };

  initAmounts = () => {
    const { allQuote } = this.props;
    const { payCurrencySlug, payValue } = this.state;

    if (!allQuote) {
      return undefined;
    }

    allQuote.forEach(({ currencyVObj, bid }) => {
      if (currencyVObj.slug === payCurrencySlug) {
        this.handlerCurrencyChange({
          value: payValue,
          bid,
        });
      }
    });

    return undefined;
  };

  handlerCurrencyChange = ({ value, bid }) => {
    this.setState({
      baseAmount: Number(value * bid).toFixed(2),
      payValue: value,
    });
  };

  componentDidMount() {
    this.initAmounts();
  }

  render() {
    const { payCurrencySlug, baseAmount } = this.state;
    const { allQuote, post, fullPath } = this.props;

    return (
      <Layout metadata={{
        url: `${fullPath}`,
        title: 'Convertor valutar',
        description: 'Convertor valutar',
      }}>
        <Page heading={'Convertor valutar'}>
          <section className="converter">
            {
              allQuote && allQuote.length ? (
                <>
                  <ConverterCard
                    baseAmount={baseAmount}
                    quote={{ ...baseCurrency }}
                    payCurrencySlug={payCurrencySlug}
                    handlerCurrencyChange={this.handlerCurrencyChange}
                    selectCurrency={this.selectCurrency}
                  />

                  {
                    allQuote.map((quote) => (
                      <ConverterCard
                        key={quote.currencyVObj.slug}
                        baseAmount={baseAmount}
                        quote={{
                          slug: quote.currencyVObj.slug,
                          name: quote.currencyVObj.name,
                          bid: quote.bid,
                        }}
                        payCurrencySlug={payCurrencySlug}
                        handlerCurrencyChange={this.handlerCurrencyChange}
                        selectCurrency={this.selectCurrency}
                      />
                    ))
                  }
                </>
              ) : <p>{'Nu a fost găsit niciun rezultat.'}</p>
            }
          </section>

          {
            post && post.textFirst && (
              <p style={{ marginTop: '3rem' }}
                 dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
            )
          }

          {
            post && post.textSecond && (
              <p style={{ marginTop: '1rem' }}
                 dangerouslySetInnerHTML={{ __html: post.textSecond }}/>
            )
          }
        </Page>
      </Layout>
    );
  }
}


// getInitialProps.
ConverterPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    namespacesRequired: ['common'],
    query,
    fullPath,
  };
};

// i18n.
const ConverterPageI18N = withTranslation('common')(ConverterPageMarkup);

// Container.
const GQL_CONVERTER_PAGE = gql`
  query ConverterPage ($where: QuoteWhereInput!, $postSlug: String!) {
    allQuote (where: $where) {
      currencyVObj {
        name
        slug
      }
      amount
      bid
    }
    post(slug: $postSlug) {
      title
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_CONVERTER_PAGE,
    {
      options: ({ fullPath }) => ({
        variables: {
          where: {
            institution: { refSlug: centralBank.slug },
            date: today(),
            error: 'no',
          },
          postSlug: fullPath,
        },
      }),
      props: ({ data: { allQuote, post } }) => ({
        allQuote,
        post,
      }),
    },
  ),
)(ConverterPageI18N);
