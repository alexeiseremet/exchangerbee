import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import _compose from 'lodash/flowRight';

import { getTranslatedConfig } from '../server.config';
import { withTranslation } from '../lib/i18n';

import Layout from '../features/Layout';
import Page from '../features/Page';
import BankCard from '../features/BankCard';

const BanksPageMarkup = (props) => {
  const { t, post, allInstitution, fullPath } = props;
  const { baseCountry } = getTranslatedConfig(t);
  const [tBCN, tBCS] = [baseCountry.name, baseCountry.slug];

  return (
    <Layout metadata={{
      url: `${fullPath}`,
      title: post && post.title ? post.title : `${t('Lista bănci')} — ${tBCN} (${tBCS})`,
      description: post && post.description ? post.description : (`
        ${t('✅ Cursul valutar afişat la băncile din {{tBCN}} pentru azi', { tBCN })}.
      `),
    }}>
      <Page
        heading={post && post.heading ? post.heading : `(${tBCS}) ${tBCN}: ${t('Lista bănci').toLowerCase()}`}
        breadcrumb={[
          { href: '/', label: t('Curs valutar') },
          { href: null, label: post && post.heading ? post.heading : t('Lista bănci') },
        ]}
      >
        {
          post && post.textFirst && (
            <p style={{ marginTop: '3rem', fontSize: '1.2rem' }}
               dangerouslySetInnerHTML={{ __html: post.textFirst }}/>
          )
        }

        {
          allInstitution && (
            <section className="bank-list">
              {
                allInstitution.map((b, i) => <BankCard key={i} bank={b}/>)
              }
            </section>
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
BanksPageMarkup.getInitialProps = async ({ req, asPath }) => {
  const fullPath = req ? `/${req.lng}${asPath}` : asPath;

  return {
    fullPath,
  };
};

// i18n.
const BanksPageI18N = withTranslation()(BanksPageMarkup);

// Container.
const GQL_ALL_INSTITUTION = gql`
  query AllInstitution ($postSlug: String!) {
    allInstitution {
      slug
      name
    }
    post(slug: $postSlug) {
      title
      description
      heading
      textFirst
      textSecond
    }
  }
`;

export default _compose(
  graphql(
    GQL_ALL_INSTITUTION,
    {
      options: ({ fullPath }) => ({
        variables: {
          postSlug: fullPath,
        },
      }),
      props: ({ data: { allInstitution, post } }) => ({
        allInstitution,
        post,
      }),
    },
  ),
)(BanksPageI18N);
