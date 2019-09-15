import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { Link, withTranslation } from '../lib/i18n';
import { textIndexPage as t } from '../lib/locale';
import { today } from '../lib/moment';

import Metadata from '../features/Metadata';
import Layout from '../features/Layout';
import Page from '../features/Page';
import { UpdateInstitution, DeleteInstitution } from '../features/Institution';
import RateCard from '../features/RateCard';
import QuoteCard from '../features/QuoteCard';

const BankPageMarkup = ({
  query: { action }, institution, allQuote, post,
}) => {
  if (!institution) {
    return null;
  }

  return (
    <Layout>
      <Metadata
        title={t.metaTitle}
        description={t.metaDescription}
        ogTitle={t.ogTitle}
        ogDescription={t.ogDescription}
      />
      <Page>
        {
          !action && (
            <>
              <Link
                href={`/bank?slug=${institution.slug}&action=update`}
                as={`/banks/${institution.slug}/update`}
              >
                <a>Update</a>
              </Link>
              &nbsp;|&nbsp;
              <DeleteInstitution institution={institution}/>
              <hr/>

              {
                <div className="page-heading">
                  <h1>
                    {
                      post
                        ? post.title
                        : `Cursul valutar la ${institution.name}`
                    }
                  </h1>
                </div>
              }

              {
                post && post.textFirst && (
                  <p dangerouslySetInnerHTML={{ __html: post.textFirst }} />
                )
              }

              <section className="quote-list">
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
                        >
                          <RateCard
                            key="bid"
                            value={quote.bid}
                            info="cumpărare"
                          />

                          <RateCard
                            key="ask"
                            value={quote.ask}
                            info="vânzare"
                          />
                        </QuoteCard>
                      ),
                    )
                  ) : 'Nu a fost găsit niciun rezultat.'
                }
              </section>

              {
                post && post.textSecond && (
                  <p style={{ marginTop: '3rem' }} dangerouslySetInnerHTML={{ __html: post.textSecond }} />
                )
              }
            </>
          )
        }

        {action && <UpdateInstitution institution={institution}/>}
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
      id
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
            date: today(),
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
