import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { centralBank, baseCurrency, baseCountry } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import RateCard from '../features/RateCard';
import QuoteCard from '../features/QuoteCard';

const BankPageMarkup = ({
  institution, allQuote, post, fullPath,
}) => {
  if (!institution) {
    return null;
  }

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: `Curs valutar la ${institution.name} (${String(institution.slug).toUpperCase()}) — ${baseCountry.name} (${String(baseCountry.slug).toUpperCase()})`,
      description: `✅ Curs valutar afișat la ${institution.name} (${String(institution.slug).toUpperCase()}) pentru azi.`,
    }}>
      <Page heading={`Curs valutar la ${institution.name} (${String(institution.slug).toUpperCase()})`}>

        <section>
          {
            allQuote && allQuote.length ? (
              allQuote.map(
                (quote, i) => (
                  <QuoteCard
                    key={i}
                    label={quote.currencyVObj.name}
                    link={{
                      href: `/currency?slug=${quote.currencyVObj.slug}`,
                      as: `/currencies/${quote.currencyVObj.slug}`,
                    }}
                    style={{ marginTop: '.5rem' }}
                  >
                    <div className="flex flex--gutter-sm">
                      {
                        institution.slug !== centralBank.slug && (
                          <div>
                            <RateCard
                              key="bid"
                              value={quote.bid}
                              info={
                                institution.slug === centralBank.slug
                                  ? baseCurrency.symbol
                                  : 'cumpărare'
                              }
                            />
                          </div>
                        )
                      }

                      <div className="flex__item-grow">
                        <RateCard
                          key="ask"
                          value={quote.ask}
                          info={
                            institution.slug === centralBank.slug
                              ? baseCurrency.symbol
                              : 'vânzare'
                          }
                        />
                      </div>
                    </div>
                  </QuoteCard>
                ),
              )
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
};

// getInitialProps.
BankPageMarkup.getInitialProps = async ({ query, req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    namespacesRequired: ['common'],
    query,
    fullPath,
  };
};

// i18n.
const BankPageI18N = withTranslation('common')(BankPageMarkup);

// Container.
const GQL_BANK_PAGE = gql`
  query BankPage ($slug: String!, $where: QuoteWhereInput!, $postSlug: String!) {
    institution(slug: $slug) {
      slug
      name
    }
    allQuote (where: $where) {
      currencyVObj {
        name
        slug
      }
      amount
      bid
      ask
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
    GQL_BANK_PAGE,
    {
      options: ({ query, fullPath }) => ({
        variables: {
          slug: query.slug,
          where: {
            institution: { refSlug: query.slug },
            date: [today()],
            error: 'no',
          },
          postSlug: fullPath,
        },
      }),
      props: ({ data: { institution, allQuote, post } }) => ({
        institution,
        allQuote,
        post,
      }),
    },
  ),
)(BankPageI18N);
