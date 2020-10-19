import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { getTranslatedConfig } from '../server.config';
import { withTranslation } from '../lib/i18n';
import { today } from '../lib/moment';

import Layout from '../features/Layout';
import Page from '../features/Page';
import RateCard from '../features/RateCard';
import QuoteCard from '../features/QuoteCard';

const BankPageMarkup = (props) => {
  const {
    t, institution, allQuote, post, fullPath,
  } = props;

  if (!institution) {
    return null;
  }

  const { baseCountry, centralBank, baseCurrency } = getTranslatedConfig(t);
  const [tBCN, tBCS] = [baseCountry.name, baseCountry.slug];
  const [tIN, tIS] = [institution.name, String(institution.slug).toUpperCase()];

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: `${t('Curs valutar')} ${tIN} ${tIS} — ${tBCN} (${tBCS})`,
      description: (`
        #${t('curs')} #${tIS} #${t('cursvalutar')} #${tIN} 
        ✅ ${t('Curs valutar afișat la casele de schimb {{tIN}} ({{tIS}}) pentru azi', { tIN, tIS })}.
      `),
    }}>
      <Page
        heading={`(${tBCS}) ${tIN}: ${t('curs valutar de azi')}`}
        breadcrumb={[
          { href: '/', label: t('Curs valutar') },
          { href: '/banks', label: t('Lista bănci') },
          { href: null, label: `${tIN} (${tIS})` },
        ]}
      >
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
                                  ? t(baseCurrency.symbol)
                                  : t('cumpără')
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
                              ? t(baseCurrency.symbol)
                              : t('vinde')
                          }
                        />
                      </div>
                    </div>
                  </QuoteCard>
                ),
              )
            ) : <p>{t('Nu a fost găsit niciun rezultat')}.</p>
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
    query,
    fullPath,
  };
};

// i18n.
const BankPageI18N = withTranslation()(BankPageMarkup);

// Container.
const GQL_BANK_PAGE = gql`
  query BankPage ($slug: String!, $where: QuoteWhereInput!, $postSlug: String!) {
    institution(slug: $slug) {
      slug
      name
      tVO: translationVObj {
        fields {
          name
        }
      }
    }
    allQuote (where: $where) {
      currencyVObj {
        name
        slug
        tVO: translationVObj {
          fields {
            name
          }
        }
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
