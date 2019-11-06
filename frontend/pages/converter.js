import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { centralBank, baseCurrency, baseCurrenciesArr, baseCountry } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import ConverterCard from '../features/ConverterCard';

class ConverterPageMarkup extends React.Component {
  state = {
    baseAmount: null,
    payCurrencySlug: baseCurrenciesArr[0],
    selectedCurrencySlug: null,
  };

  handlerSelectCurrency = (slug) => {
    this.setState({
      selectedCurrencySlug: slug,
    });
  };

  handlerCurrencyChange = ({ payValue, bid }) => {
    this.setState({
      baseAmount: Number(payValue * bid).toFixed(2),
    });
  };

  render() {
    const { payCurrencySlug, baseAmount, selectedCurrencySlug } = this.state;
    const { allQuote, post, fullPath } = this.props;

    return (
      <Layout metadata={{
        url: `${fullPath}`,
        title: `Convertor valutar — ${baseCountry.name}`,
        description: `Convertor valutar`,
      }}>
        <Page heading={`Convertor valutar`}>
          <section className="converter">
            {
              allQuote && allQuote.length ? (
                <>
                  <ConverterCard
                    baseAmount={baseAmount}
                    quote={{ ...baseCurrency }}
                    payCurrencySlug={payCurrencySlug}
                    selectedCurrencySlug={selectedCurrencySlug}
                    currencyChange={this.handlerCurrencyChange}
                    selectCurrency={this.handlerSelectCurrency}
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
                        selectedCurrencySlug={selectedCurrencySlug}
                        currencyChange={this.handlerCurrencyChange}
                        selectCurrency={this.handlerSelectCurrency}
                      />
                    ))
                  }
                </>
              ) : <p>{'Nu a fost găsit niciun rezultat.'}</p>
            }
          </section>

          {
            post && post.textFirst && (
              <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
                 dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
            )
          }

          {
            post && post.textSecond && (
              <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}
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
